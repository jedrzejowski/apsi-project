export type Dictionary<T> = { [key: string]: T }

export type NotificationLevel = "info" | "error" | "warning" | "success";

export type RemoteObject<T> =
    { readonly type: "loading" } |
    { readonly type: "error", readonly error: any } |
    { readonly type: "data", readonly data: T };

declare namespace DataT {
    interface AppState {
        user_data?: RemoteObject<UserData>,
        user_data_updating?: boolean

        current_page?: { type: string, id: string }

        device_list?: DeviceShort[]
        device_map?: Dictionary<DeviceDetails>

        next_notification_id?: number
        notification_dictionary?: Dictionary<Notification>
    }

    interface UserData {
        username: string
        password: string
        authorization_token: string
        first_name: string
        last_name: string
    }

    interface RegistrationData extends UserData {
        password: string
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
        dth: DeviceType
    }

    interface DeviceDetails {
        deviceId: string,
        app: {
            externalId: string,
            installedAppId: string,
            profile: {
                id: string
            }
        },
        childDevices: [
            null
        ],
        components: [
            {
                capabilities: [
                    {
                        id: string,
                        version: string
                    }
                ],
                id: string,
                label: string
            }
        ],
        deviceManufacturerCode: string,
        deviceNetworkType: string,
        deviceTypeId: string,
        deviceTypeName: string,
        dth: DeviceType
        label: string,
        locationId: string,
        name: string,
        profile: {
            id: string
        },
        roomId: string,
        type: string
    }

    interface DeviceType {
        completedSetup: boolean,
        deviceNetworkType: string,
        deviceTypeId: string,
        deviceTypeName: string,
        hubId: string,
        networkSecurityLevel: string
    }

    type DeviceAttribute = DeviceAttributeEnum

    interface DeviceAttributeEnum {
        name: string,
        type: "enum",
        possibleValues: string[]
    }

    interface DeviceCommand {
        name: string
        arguments: any[]
    }
}

export {DataT};
