import {Action, makeAction} from "../actions";
import {call, put, select} from "redux-saga/effects";
import apiFetch from "../../lib/apiFetch";
import {userDataSelector} from "./user_data";
import {deviceHistorySelector} from "./device_history";
import {userHistorySelector} from "./user_history";

export function* fetchDeviceCommandRequestSaga(action: Action<"DEVICE_COMMAND_REQUEST">) {
    const command_request = action.data;

    try {
        const user_data: ReturnType<typeof userDataSelector> = yield select(userDataSelector);

        yield put(makeAction("DEVICE_CAPABILITIES_STATUS_SET", {
            id: [command_request.device_id, command_request.capability_name],
            type: "loading"
        }));

        if (user_data?.type !== "data") {
            throw new Error();
        }

        const response = yield call(() => apiFetch({
            method: "POST",
            url: "/devices/commands",
            headers: {
                "Authorization": user_data.data.authorization_token,
                "Content-Type": "application/json"
            },
            params: {
                deviceId: command_request.device_id,
                userLogin: user_data.data.username
            },
            body: JSON.stringify({
                commands: [{
                    component: "main",
                    capability: command_request.capability_name,
                    command: command_request.command_name,
                    arguments: command_request.arguments,
                }]
            })
        }));


        yield put(makeAction("DEVICE_CAPABILITIES_STATUS_REQUEST", {
            device_id: command_request.device_id,
            capability_name: command_request.capability_name
        }));

        if (response.status !== 200) {
            throw new Error();
        }

        const data = yield call(() => response.text());

        yield put(makeAction("NOTIFICATION_ADD", {
            level: "success",
            content: "notification_msg.device_command_success"
        }));

        {
            // aktualizacja historii urządzenia
            const device_history: ReturnType<typeof deviceHistorySelector> =
                yield select(deviceHistorySelector, command_request.device_id);

            if (device_history?.type === "data") {
                yield put(makeAction("DEVICE_HISTORY_SET", {
                    ...device_history, needUpdate: true
                }));
            }
        }

        {
            // aktualizacja historii użytkownika
            const user_history: ReturnType<typeof deviceHistorySelector> =
                yield select(userHistorySelector, command_request.device_id);

            if (user_history?.type === "data") {
                yield put(makeAction("DEVICE_HISTORY_SET", {
                    ...user_history, needUpdate: true
                }));
            }
        }

    } catch (error) {

        yield put(makeAction("NOTIFICATION_ADD", {
            content: "notification_msg.device_command_failed",
            level: "error",
            data: error
        }));
    }
}


export function* fetchDeviceAddToAppRequestSaga(action: Action<"DEVICE_ADD_TO_APP_REQUEST">) {
    const device_id = action.data;

    try {
        const user_data: ReturnType<typeof userDataSelector> = yield select(userDataSelector);

        if (user_data?.type !== "data") {
            throw new Error();
        }

        const response = yield call(() => apiFetch({
            method: "POST",
            url: "/devices/addToApp",
            headers: {
                "Authorization": user_data.data.authorization_token,
            },
            params: {deviceId: device_id}
        }));


        if (response.status !== 200) {
            throw new Error();
        }

        const data = yield call(() => response.text());

        yield put(makeAction("NOTIFICATION_ADD", {
            level: "success",
            content: "notification_msg.device_added_to_app"
        }));

        yield put(makeAction("DEVICE_LIST_REQUEST", undefined));
        yield put(makeAction("DEVICE_DETAILS_REQUEST", device_id));
        yield put(makeAction("CAPABILITIES_TILES_REQUEST", device_id));

    } catch (error) {

        yield put(makeAction("NOTIFICATION_ADD", {
            content: "notification_msg.unknown_error",
            level: "error",
            data: error
        }));
    }
}