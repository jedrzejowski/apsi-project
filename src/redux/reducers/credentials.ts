import type {DataT, RemoteObject} from "../../types";
import useAppSelector from "../../hooks/useAppSelector";
import {Action, makeAction} from "../actions";
import {call, put, select} from "redux-saga/effects";
import appFetch from "../../lib/appFetch";
import {NotificationLevel} from "../../lib/logger";


function credentialsSelector(state: DataT.AppState) {
    return state.credentials ?? null;
}

export function useCredentials() {
    return useAppSelector(credentialsSelector);
}

export function commitCredentialsSet(state: DataT.AppState, data: RemoteObject<DataT.Credentials>): DataT.AppState {
    return {
        ...state,
        credentials: data
    }
}

export function* fetchCredentialsSaga(action: Action<"CREDENTIALS_REQUEST">) {
    try {
        yield put(makeAction("CREDENTIALS_SET", {type: "loading"}));
        const {password, username} = action.data;
        const state: DataT.AppState = yield select();

        if (username === "" || password === "") {
            yield put(makeAction("CREDENTIALS_SET", {type: "error", error: null}));
            return
        }

        // const response = yield call(() => appFetch({
        //     state,
        //     method: "GET",
        //     url: "/????",
        //     params: {}
        // }));
        //
        // if (response.status !== 200) {
        //     throw new Error();
        // }
        //
        // const data = yield call(() => response.json());

        const data = yield call(() => new Promise<RemoteObject<DataT.Credentials>>(resolve => {
            setTimeout(() => {
                resolve({
                    type: "data",
                    data: {
                        authorization_token: "Bearer 3fe718bb-ea6e-485a-901a-042799f279d6"
                    }
                })
            }, 1000);
        }));

        yield put(makeAction("CREDENTIALS_SET", data));

    } catch (error) {

        yield put(
            makeAction("NOTIFICATION_ADD", {
                content: "error_msg.credentials_fail",
                level: NotificationLevel.Error
            })
        );

        yield put(makeAction("CREDENTIALS_SET", {type: "error", error}));
    }
}
