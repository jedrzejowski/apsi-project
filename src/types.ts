import type AppError from "./lib/AppError";
import {NotificationLevel} from "./lib/logger";

export type Dictionary<T> = { [key: string]: T }

declare namespace DataT {
    interface AppState {
        backend_url: string,
        authorization: string,

        current_page?: { type: string, id: string }

        device_list?: DeviceShort[]
        device_map?: Dictionary<DeviceDetails>

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

    interface DeviceDetails {
        "deviceId": string,
        "app": {
            "externalId": string,
            "installedAppId": string,
            "profile": {
                "id": string
            }
        },
        "childDevices": [
            null
        ],
        "components": [
            {
                "capabilities": [
                    {
                        "id": string,
                        "version": string
                    }
                ],
                "id": string,
                "label": string
            }
        ],
        "deviceManufacturerCode": string,
        "deviceNetworkType": string,
        "deviceTypeId": string,
        "deviceTypeName": string,
        "dth": {
            "completedSetup": boolean,
            "deviceNetworkType": string,
            "deviceTypeId": string,
            "deviceTypeName": string,
            "hubId": string,
            "networkSecurityLevel": string
        },
        "label": string,
        "locationId": string,
        "name": string,
        "profile": {
            "id": string
        },
        "roomId": string,
        "type": string
    }
}

export {DataT};