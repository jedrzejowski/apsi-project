export type Dictionary<T> = { [key: string]: T }

export type NotificationLevel = "info" | "error" | "warning" | "success";

export type RemoteObject<T, ID = string> =
    { id: ID, type: "loading" } |
    { id: ID, type: "error", error: any } |
    {
        id: ID, type: "data", data: T,
        updating?: boolean, needUpdate?: boolean
    }

declare namespace DataT {
    interface AppState {
        user_data?: RemoteObject<UserData>,
        user_history?: Dictionary<RemoteObject<HistoryEntry[]>>

        device_list?: RemoteObject<DeviceShort[]>
        device_details?: Dictionary<RemoteObject<DeviceDetails>>
        device_history?: Dictionary<RemoteObject<HistoryEntry[]>>
        devices_capability_status?: Dictionary<RemoteObject<DeviceCapabilityStatus, [string, string]>>

        capabilities_tiles?: Dictionary<RemoteObject<CapabilityTile[]>>

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
        presentInApp: boolean
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
        childDevices: [null],
        components: DeviceComponent[]
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

    interface DeviceComponent {
        id: string
        label: string
        capabilities: {
            id: string,
            version: string
        }[]
    }

    interface DeviceType {
        completedSetup: boolean,
        deviceNetworkType: string,
        deviceTypeId: string,
        deviceTypeName: string,
        hubId: string,
        networkSecurityLevel: string
    }

    interface CapabilityTile {
        capabilityName: string
        attributes: DeviceCapabilityAttribute[]
        commands: DeviceCapabilityCommand[]
    }

    type DeviceCapabilityAttribute = DeviceCapabilityAttributeEnum | DeviceCapabilityAttributeInteger;

    interface DeviceCapabilityAttributeEnum {
        type: "switch"
        name: string,
        value: string,
        possibleValues: string[]
    }

    interface DeviceCapabilityAttributeInteger {
        type: "integer"
        name: string
        maximum: number
        minimum: number
        value: number
    }

    interface DeviceCapabilityCommand {
        name: string
        arguments: string[]
    }

    interface DeviceCommandRequest {
        device_id: string
        capability_name: string
        command_name: string
        arguments: any[]
    }

    interface HistoryEntry {
        command: string,
        device: string,
        timestamp: string,
        user: string
    }

    interface DeviceCapabilityStatus {
        [attribute_name: string]: {
            value: string
        }
    }
}

export {DataT};
