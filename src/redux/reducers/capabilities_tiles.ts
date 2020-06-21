import {DataT, RemoteObject} from "../../types";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import {Action, makeAction} from "../actions";
import {call, put, select} from "redux-saga/effects";
import apiFetch from "../../lib/apiFetch";

export function capabilitiesTilesSelector(state: DataT.AppState, device_id: string) {
    return state.capabilities_tiles?.[device_id] ?? null;
}

export function useCapabilitiesTiles(device_id: string) :RemoteObject<DataT.CapabilityTile[]>{
    const dispatch = useAppDispatch();
    const device_details = useAppSelector(state => capabilitiesTilesSelector(state, device_id));

    if (!device_details) {
        dispatch("CAPABILITIES_TILES_REQUEST", device_id);

        return {
            id: device_id,
            type: "loading"
        };
    }

    return device_details;
}

export function commitCapabilitiesTilesSet(state: DataT.AppState, object: RemoteObject<DataT.CapabilityTile[]>): DataT.AppState {

    return {
        ...state,
        capabilities_tiles: {
            ...state.capabilities_tiles,
            [object.id]: object
        }
    }
}

export function* fetchCapabilitiesTilesSaga(action: Action<"CAPABILITIES_TILES_REQUEST">) {
    try {
        yield put(makeAction("CAPABILITIES_TILES_SET", {
            id: action.data,
            type: "loading"
        }));

        const response = yield call(() => apiFetch({
            method: "GET",
            url: "/capabilities/tiles",
            params: {
                deviceId: action.data
            }
        }));

        if (response.status !== 200) {
            throw new Error();
        }

        const data = yield call(() => response.json());

        yield put(makeAction("CAPABILITIES_TILES_SET", {
            id: action.data,
            type: "data",
            data: data.tiles
        }));

    } catch (error) {

        yield put(makeAction("CAPABILITIES_TILES_SET", {
            id: action.data,
            type: "error",
            error: error
        }));

        yield put(makeAction("NOTIFICATION_ADD", {
            content: "notification_msg.unknown_error",
            level: "error",
            data: error
        }));
    }
}
