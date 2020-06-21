import {DataT, RemoteObject} from "../../types";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import {Action, makeAction} from "../actions";
import {userDataSelector} from "./user_data";
import {call, put, select} from "redux-saga/effects";
import apiFetch from "../../lib/apiFetch";

type ObjectType = RemoteObject<DataT.DeviceCapabilityStatus, [string, string]>;

export function devicesCapabilityStatusSelector(state: DataT.AppState,
                                                device_id: string, capability_id: string): ObjectType | null {
    return state.devices_capability_status?.[`${device_id}:${capability_id}`] ?? null
}

export function useDevicesCapabilityStatus(device_id: string, capability_id: string): ObjectType {
    const dispatch = useAppDispatch();
    const devices_capability_status = useAppSelector(state => devicesCapabilityStatusSelector(state, device_id, capability_id));

    if (!devices_capability_status) {
        dispatch("DEVICE_CAPABILITIES_STATUS_REQUEST", {device_id, capability_id});

        return {
            id: [device_id, capability_id],
            type: "loading"
        };
    }

    return devices_capability_status;
}

export function commitDevicesCapabilityStatusSet(state: DataT.AppState, object: ObjectType): DataT.AppState {

    return {
        ...state,
        devices_capability_status: {
            ...state.devices_capability_status,
            [`${object.id[0]}:${object.id[1]}`]: object
        }
    }
}

export function* fetchDeviceCapabilityStatusRequestSaga(action: Action<"DEVICE_CAPABILITIES_STATUS_REQUEST">) {
    const {capability_id, device_id} = action.data;
    const id: [string, string] = [device_id, capability_id];

    try {
        yield put(makeAction("DEVICE_CAPABILITIES_STATUS_SET", {
            id, type: "loading"
        }));

        const user_data: ReturnType<typeof userDataSelector> = yield select(userDataSelector);

        if (user_data?.type !== "data") {
            throw new Error();
        }

        const response = yield call(() => apiFetch({
            method: "GET",
            url: "/devices/capability/status",
            headers: {
                "Authorization": user_data.data.authorization_token,
            },
            params: {
                capabilityId: capability_id,
                deviceId: device_id
            },
        }));

        if (response.status !== 200) {
            throw new Error();
        }

        const data = yield call(() => response.json());

        yield put(makeAction("DEVICE_CAPABILITIES_STATUS_SET", {
            id, type: "data", data: data[capability_id]
        }));
    } catch (error) {

        yield put(makeAction("DEVICE_CAPABILITIES_STATUS_SET", {
            id, type: "error", error
        }));

        yield put(makeAction("NOTIFICATION_ADD", {
            content: "notification_msg.unknown_error",
            level: "error",
            data: error
        }));
    }
}