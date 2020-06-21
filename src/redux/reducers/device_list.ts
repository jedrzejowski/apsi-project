import {DataT, RemoteObject} from "../../types";
import apiFetch from "../../lib/apiFetch";
import {Action, makeAction} from "../actions";
import {select, call, put} from "redux-saga/effects";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";

function deviceListSelector(state: DataT.AppState) {
    return state.device_list ?? null;
}

export function useDeviceList(): RemoteObject<DataT.DeviceShort[]> {
    const dispatch = useAppDispatch();
    const device_list = useAppSelector(deviceListSelector);

    if (!device_list) {
        dispatch("DEVICE_LIST_REQUEST", undefined);

        return {
            id: "null",
            type: "loading"
        };
    }

    return device_list
}

export function useDeviceShort(device_id: string): RemoteObject<DataT.DeviceShort> {
    const device_list = useDeviceList();

    if (device_list.type === "data") {
        const device_short = device_list.data.find(device => device.deviceId === device_id);

        return device_short ? {
            id: device_id,
            type: "data",
            data: device_short
        } : {
            id: device_id,
            type: "error",
            error: "not found"
        };
    } else {
        return {
            ...device_list,
            id: device_id,
        };
    }

}

export function commitDeviceListSet(state: DataT.AppState, data: RemoteObject<DataT.DeviceShort[]>): DataT.AppState {

    return {
        ...state,
        device_list: data
    }
}

export function* fetchDeviceListSaga(action: Action<"DEVICE_LIST_REQUEST">) {
    try {
        const state: DataT.AppState = yield select();

        if (state.user_data?.type !== "data") {
            throw new Error();
        }

        const user_data = state.user_data.data;

        const response = yield call(() => apiFetch({
            method: "GET",
            url: "/devices/list",
            params: {},
            headers: {
                Authorization: user_data.authorization_token
            }
        }));

        if (response.status !== 200) {
            throw new Error();
        }

        const {items} = yield call(() => response.json());

        yield put(makeAction("DEVICE_LIST_SET", {
            id: "null",
            type: "data",
            data: items
        }));
    } catch (error) {

        yield put(makeAction("DEVICE_LIST_SET", {
            id: "null",
            type: "error",
            error
        }));

        yield put(
            makeAction("NOTIFICATION_ADD", {
                content: "notification_msg.token_credentials_fail",
                level: "error"
            })
        );
    }
}
