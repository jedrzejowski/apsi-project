import {DataT} from "../../types";
import apiFetch from "../../lib/apiFetch";
import {Action, makeAction} from "../actions";
import {select, call, put} from "redux-saga/effects";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";

export function deviceDetailsSelector(state: DataT.AppState, device_id: string) {
    return state.device_map?.[device_id] ?? null;
}

export function useDeviceDetails(device_id: string) {
    const dispatch = useAppDispatch();
    const device_details = useAppSelector(state => deviceDetailsSelector(state, device_id));

    if (!device_details) {
        dispatch("DEVICE_DETAILS_REQUEST", device_id);
    }

    return device_details;
}

export function commitDeviceDetailsSet(state: DataT.AppState, device: DataT.DeviceDetails): DataT.AppState {

    return {
        ...state,
        device_map: {
            ...state.device_map,
            [device.deviceId]: device
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

        const data = yield call(() => response.json());

        yield put(makeAction("DEVICE_DETAILS_SET", data));

    } catch (error) {

        yield put(
            makeAction("NOTIFICATION_ADD", {
                content: "error_msg.token_credentials_fail",
                level: "error"
            })
        );
    }
}
