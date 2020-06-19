import {DataT} from "../../types";
import apiFetch from "../../lib/apiFetch";
import {Action, makeAction} from "../actions";
import {select, call, put} from "redux-saga/effects";
import {NotificationLevel} from "../../lib/logger";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";

function deviceListSelector(state: DataT.AppState) {
    return state.device_list ?? null;
}

export function useDeviceList(): DataT.DeviceShort[] | null {
    const dispatch = useAppDispatch();
    const device_list = useAppSelector(deviceListSelector);

    if (!device_list) {
        dispatch("DEVICE_LIST_REQUEST", null);
    }

    return device_list;
}

export function useDeviceShort(device_id: string): DataT.DeviceShort | null {
    const device_list = useDeviceList();

    return device_list?.find(device => device.deviceId === device_id) ?? null;
}

export function commitDeviceListSet(state: DataT.AppState, data: DataT.DeviceShort[]): DataT.AppState {

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
            state,
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

        yield put(makeAction("DEVICE_LIST_SET", items));
    } catch (error) {

        yield put(
            makeAction("NOTIFICATION_ADD", {
                content: "error_msg.credentials_fail",
                level: NotificationLevel.Error
            })
        );
    }
}
