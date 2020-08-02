import {Action, makeAction} from "../actions";
import {call, put, select} from "redux-saga/effects";
import type {DataT} from "../../types";

function wait(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function* timerSaga(action: Action<"TIMER">) {
    const tick = action.data;

    while (true) {
        try {
            yield call(() => wait(tick));

            const selector = (state: DataT.AppState) => state.devices_capability_status;
            const statuses: ReturnType<typeof selector> = yield select(selector);

            for (let key of Object.keys(statuses ?? {})) {
                const [device_id, capability_name] = key.split(":");

                yield put(makeAction("DEVICE_CAPABILITIES_STATUS_REQUEST", {device_id, capability_name}));
            }

        } catch (error) {
        }
    }
}
