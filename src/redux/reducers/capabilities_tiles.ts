import {DataT, RemoteObject} from "../../types";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import {Action, makeAction} from "../actions";
import {call, put, select} from "redux-saga/effects";
import apiFetch from "../../lib/apiFetch";

export function capabilitiesTilesSelector(state: DataT.AppState, device_id: string) {
    return state.capabilities_tiles?.[device_id] ?? null;
}

export function useCapabilitiesTiles(device_id: string,): RemoteObject<DataT.CapabilityTile[]> {
    const dispatch = useAppDispatch();
    let capabilities_tiles = useAppSelector(state => capabilitiesTilesSelector(state, device_id));

    if (!capabilities_tiles) {
        dispatch("CAPABILITIES_TILES_REQUEST", device_id);

        capabilities_tiles = {
            id: device_id,
            type: "loading"
        };
    }

    return capabilities_tiles;
}

export function useCapabilitiesTile(device_id: string, capability_name: string): RemoteObject<DataT.CapabilityTile, [string, string]> {
    const capabilities_tiles = useCapabilitiesTiles(device_id);
    const id: [string, string] = [device_id, capability_name];

    if (capabilities_tiles.type === "data") {
        let capabilities_tile = capabilities_tiles.data.find(capability_tile => {
            return capability_tile.capabilityName === capability_name
        });

        return (capabilities_tile ? {
            id,
            type: "data",
            data: capabilities_tile
        } : {
            id,
            type: "error",
            error: "not found"
        })
    }

    return {...capabilities_tiles, id}
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
