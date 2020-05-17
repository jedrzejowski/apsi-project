import {DataT} from "../types";

export interface Actions {
    DEVICE_LIST_REQUEST: any
    DEVICE_LIST_SET: DataT.DeviceShort[]

    DEVICE_DETAILS_REQUEST: string
    DEVICE_DETAILS_SET: DataT.DeviceDetails

    NOTIFICATION_ADD: Partial<DataT.Notification>
    NOTIFICATION_REMOVE: string
}

export interface Action<T extends keyof Actions = any> {
    type: T
    data: Actions[T]
}

export function makeAction<T extends keyof Actions>(name: T, data: Actions[T]): Action<T> {
    return {type: name, data};
}

