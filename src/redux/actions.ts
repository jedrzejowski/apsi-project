import {DataT, RemoteObject} from "../types";

export interface Actions {
    USER_LOGIN: { username: string, password: string }
    USER_LOGOUT: undefined
    USER_REGISTER: DataT.UserData
    USER_DATA_SET: RemoteObject<DataT.UserData>
    USER_DATA_UPDATE: DataT.UserData
    USER_DATA_UPDATING_SET: boolean | undefined
    USER_HISTORY_REQUEST: string
    USER_HISTORY_SET: RemoteObject<DataT.HistoryEntry[]>

    DEVICE_LIST_REQUEST: undefined
    DEVICE_LIST_SET: RemoteObject<DataT.DeviceShort[]>
    DEVICE_DETAILS_REQUEST: string
    DEVICE_DETAILS_SET: RemoteObject<DataT.DeviceDetails>
    DEVICE_HISTORY_REQUEST: string
    DEVICE_HISTORY_SET: RemoteObject<DataT.HistoryEntry[]>
    DEVICE_COMMAND_REQUEST: DataT.DeviceCommandRequest

    CAPABILITIES_TILES_REQUEST: string
    CAPABILITIES_TILES_SET: RemoteObject<DataT.CapabilityTile[]>


    NOTIFICATION_ADD: DataT.Notification
    NOTIFICATION_REMOVE: string
}

export interface Action<T extends keyof Actions = any> {
    type: T
    data: Actions[T]
}

export function makeAction<T extends keyof Actions>(name: T, data: Actions[T]): Action<T> {
    return {type: name, data};
}

