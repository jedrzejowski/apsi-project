import {Action, makeAction} from "../actions";
import {call, put, select} from "redux-saga/effects";
import apiFetch from "../../lib/apiFetch";
import {userDataSelector} from "./user_data";

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

    } catch (error) {

        yield put(makeAction("NOTIFICATION_ADD", {
            content: "notification_msg.device_command_failed",
            level: "error",
            data: error
        }));
    }
}
