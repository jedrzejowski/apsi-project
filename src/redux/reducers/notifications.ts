import type {DataT} from "../../types";
import {useSelector} from "react-redux";
import areArraysSame from "../../lib/areArraysSame";

export function notificationSelector(state: DataT.AppState, notification_id: string): DataT.Notification | null {
    return state?.notification_dictionary?.[notification_id] ?? null;
}

export function useNotification(notification_id: string) {
    return useSelector((state: DataT.AppState) => notificationSelector(state, notification_id));
}

export function useAllNotificationsIds() {
    return useSelector((state: DataT.AppState) => Object.keys(state.notification_dictionary ?? {}), areArraysSame);
}

export function commitNotificationAdd(state: DataT.AppState, notification: DataT.Notification): DataT.AppState {
    let notification_dictionary = state.notification_dictionary ?? {};
    let next_notification_id = state.next_notification_id ?? 0;

    notification_dictionary = {
        ...notification_dictionary,
        [next_notification_id.toString()]: notification
    };

    return {
        ...state,
        notification_dictionary,
        next_notification_id: ++next_notification_id
    }
}

export function commitNotificationRemove(state: DataT.AppState, notification_id: string): DataT.AppState {
    let notification_dictionary = state.notification_dictionary ?? {};

    notification_dictionary = {...notification_dictionary};
    delete notification_dictionary[notification_id];

    return {
        ...state,
        notification_dictionary
    }
}