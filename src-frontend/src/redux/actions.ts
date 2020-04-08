import AppData from "./AppData";

export interface Actions {
    NOTIFICATION_ADD: Partial<AppData.Notification>
    NOTIFICATION_REMOVE: string
}

export interface Action<T extends keyof Actions = any> {
    type: T
    data: Actions[T]
}

export function makeAction<T extends keyof Actions>(name: T, data: Actions[T]): Action<T> {
    return {type: name, data};
}

