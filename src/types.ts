import type AppError from "./lib/AppError";
import {NotificationLevel} from "./lib/logger";

export type Dictionary<T> = { [key: string]: T }

declare namespace DataT {
    interface AppState {
        backend_url: string,
        authorization: string,

        deviceList?: DeviceShort[]
        deviceMap?: Dictionary<Device>

        next_notification_id?: number
        notification_dictionary?: Dictionary<Notification>
    }

    interface Notification {
        content: string
        level: NotificationLevel
        data?: any
    }

    interface DeviceShort {
        deviceId: string
        name: string
        label: string,
        deviceTypeId: string
    }

    interface Device {

    }
}

export {DataT};