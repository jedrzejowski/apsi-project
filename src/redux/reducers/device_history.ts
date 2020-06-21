import {DataT, RemoteObject} from "../../types";
import apiFetch from "../../lib/apiFetch";
import {Action, makeAction} from "../actions";
import {select, call, put} from "redux-saga/effects";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";

function deviceHistorySelector(state: DataT.AppState, device_id: string) {
    return state.device_history?.[device_id] ?? null;
}

export function useDeviceHistory(device_id: string): RemoteObject<DataT.HistoryEntry[]> {
    const dispatch = useAppDispatch();
    const device_history = useAppSelector(state => deviceHistorySelector(state, device_id));

    if (!device_history) {
        dispatch("DEVICE_HISTORY_REQUEST", device_id);
        return {
            id: device_id,
            type: "loading"
        };
    }

    return device_history;
}

export function commitDeviceHistorySet(state: DataT.AppState, data: RemoteObject<DataT.HistoryEntry[]>): DataT.AppState {

    return {
        ...state,
        device_history: {
            ...state.device_history,
            [data.id]: data
        }
    }
}

export function* fetchDeviceHistorySaga(action: Action<"DEVICE_HISTORY_REQUEST">) {
    const device_id = action.data;

    try {
        const response = yield call(() => apiFetch({
            method: "GET",
            url: "/history/device",
            params: {deviceId: device_id}
        }));

        if (response.status !== 200) {
            throw new Error();
        }

        const history = yield call(() => response.json());

        yield put(makeAction("DEVICE_HISTORY_SET", {
            id: device_id,
            type: "data",
            data: history
        }));
    } catch (error) {

        yield put(makeAction("DEVICE_HISTORY_SET", {
            id: device_id,
            type: "error",
            error
        }));

        yield put(
            makeAction("NOTIFICATION_ADD", {
                content: "notification_msg.unknown_error",
                level: "error"
            })
        );
    }
}
