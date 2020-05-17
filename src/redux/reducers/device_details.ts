import {DataT} from "../../types";
import appFetch from "../../lib/appFetch";
import {Action, makeAction} from "../actions";
import {select, call, put} from "redux-saga/effects";
import {NotificationLevel} from "../../lib/logger";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";

function deviceDetailsSelector(state: DataT.AppState, device_id: string) {
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

export function commitDeviceDetailsSet(state: DataT.AppState, action: Action<"DEVICE_DETAILS_SET">): DataT.AppState {

    return {
        ...state,
        device_map: {
            ...state.device_map,
            [action.data.deviceId]: action.data
        }
    }
}

export function* fetchDeviceDetailsSaga(action: Action<"DEVICE_DETAILS_REQUEST">) {
    try {
        const state: DataT.AppState = yield select();

        const response = yield call(() => appFetch({
            state,
            method: "GET",
            url: "/devices/details",
            params: {
                deviceId: action.data
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
                content: "error_msg.credentials_fail",
                level: NotificationLevel.Error
            })
        );
    }
}
