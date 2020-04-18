import type AppError from "../lib/AppError";
import {NotificationLevel} from "../lib/logger";
import type {Dictionary} from "../types";

declare namespace AppData {

    interface State {

        next_notification_id?: number
        notification_dictionary?: Dictionary<Notification>
    }

    interface Notification {
        content: string
        level: NotificationLevel
        data?: any
    }
}

export default AppData;