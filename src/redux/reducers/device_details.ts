import {DataT, RemoteObject} from "../../types";
import apiFetch from "../../lib/apiFetch";
import {Action, makeAction} from "../actions";
import {select, call, put} from "redux-saga/effects";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";

export function deviceDetailsSelector(state: DataT.AppState, device_id: string) {
    return state.device_details?.[device_id] ?? null;
}

export function useDeviceDetails(device_id: string): RemoteObject<DataT.DeviceDetails> {
    const dispatch = useAppDispatch();
    const device_details = useAppSelector(state => deviceDetailsSelector(state, device_id));

    if (!device_details) {
        dispatch("DEVICE_DETAILS_REQUEST", device_id);

        return {
            id: device_id,
            type: "loading"
        };
    }

    return device_details
}

export function commitDeviceDetailsSet(state: DataT.AppState, object: RemoteObject<DataT.DeviceDetails>): DataT.AppState {

    return {
        ...state,
        device_details: {
            ...state.device_details,
            [object.id]: object
        }
    }
}

export function* fetchDeviceDetailsSaga(action: Action<"DEVICE_DETAILS_REQUEST">) {
    try {

        const state: DataT.AppState = yield select();

        if (state.user_data?.type !== "data") {
            throw new Error();
        }

        const user_data = state.user_data.data;

        const response = yield call(() => apiFetch({
            method: "GET",
            url: "/devices/details",
            params: {
                deviceId: action.data
            },
            headers: {
                Authorization: user_data.authorization_token
            }
        }));

        if (response.status !== 200) {
            throw new Error();
        }

        const data: DataT.DeviceDetails = yield call(() => response.json());

        yield put(makeAction("DEVICE_DETAILS_SET", {
            id: action.data,
            type: "data",
            data
        }));

    } catch (error) {

        yield put(makeAction("DEVICE_DETAILS_SET", {
            id: action.data,
            type: "error",
            error: error
        }));

        yield put(makeAction("NOTIFICATION_ADD", {
            content: "notification_msg.token_credentials_fail",
            level: "error",
            data: error
        }));
    }
}
