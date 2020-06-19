import type {DataT, RemoteObject} from "../../types";
import useAppSelector from "../../hooks/useAppSelector";
import {Action, makeAction} from "../actions";
import {call, put, select, all} from "redux-saga/effects";
import apiFetch from "../../lib/apiFetch";
import {NotificationLevel} from "../../lib/logger";

function userDataSelector(state: DataT.AppState) {
    return state.user_data ?? null;
}

function userDataUpdatingSelector(state: DataT.AppState) {
    return state.user_data_updating ?? false;
}

export function useUserData() {
    return useAppSelector(userDataSelector);
}

export function useIsUserDataUpdating() {
    return useAppSelector(userDataUpdatingSelector);
}

export function commitUserData(state: DataT.AppState, data: RemoteObject<DataT.UserData>): DataT.AppState {
    return {
        ...state,
        user_data: data
    }
}

export function commitUserDataUpdating(state: DataT.AppState, updating?: boolean): DataT.AppState {
    return {
        ...state,
        user_data_updating: updating
    }
}

export function* fetchUserLoginSaga(action: Action<"USER_LOGIN">) {
    try {
        yield put(makeAction("USER_DATA_SET", {type: "loading"}));
        const {password, username} = action.data;
        const state: DataT.AppState = yield select();

        if (username === "" || password === "") {
            yield put(makeAction("USER_DATA_SET", {type: "error", error: null}));
            return
        }

        let response = yield call(() => apiFetch({
            state,
            method: "GET",
            url: "/users/login",
            params: {
                login: username,
                password
            }
        }));

        if (response.status !== 200) {
            throw new Error();
        }

        let data: any = yield call(() => response.json());
        const authorization_token = data.token;

        response = yield call(() => apiFetch({
            state,
            method: "GET",
            url: "/users/info",
            params: {
                login: username,
                token: authorization_token
            }
        }));

        if (response.status !== 200) {
            throw new Error();
        }

        data = yield call(() => response.json());

        const {
            name: first_name,
            surname: last_name
        } = data;

        yield put(makeAction("USER_DATA_SET", {
            type: "data",
            data: {
                username,
                password,
                authorization_token,
                first_name,
                last_name
            }
        }));

    } catch (error) {

        yield put(
            makeAction("NOTIFICATION_ADD", {
                content: "error_msg.credentials_fail",
                level: NotificationLevel.Error
            })
        );

        yield put(makeAction("USER_DATA_SET", {type: "error", error}));
    }
}


export function* fetchUserDataUpdateSaga(action: Action<"USER_DATA_UPDATE">) {
    const new_user_data = action.data;

    try {
        yield put(makeAction("USER_DATA_UPDATING_SET", true));
        const state: DataT.AppState = yield select();

        if (state.user_data?.type !== "data") {
            throw new Error();
        }

        const old_user_data = state.user_data.data;
        let current_data = old_user_data;

        // zmiana danych osobowych

        if (
            new_user_data.last_name !== old_user_data.last_name ||
            new_user_data.first_name !== old_user_data.first_name
        ) {
            const response = yield call(() => apiFetch({
                state,
                method: "PUT",
                url: "/users/update/info",
                params: {
                    login: current_data.username,
                    name: new_user_data.first_name,
                    surname: new_user_data.last_name,
                    token: current_data.authorization_token
                },
                headers: {
                    Accept: "text/plain;charset=UTF-8"
                }
            }));

            if (response.status !== 200) {
                throw new Error();
            }

            yield call(() => response.text());

            current_data.first_name = new_user_data.first_name;
            current_data.last_name = new_user_data.last_name;

            yield put(makeAction("USER_DATA_SET", {type: "data", data: current_data}));
        }

        // zmiana hasła

        if (old_user_data.password !== new_user_data.password) {

            const response = yield call(() => apiFetch({
                state,
                method: "PUT",
                url: "/users/update/password",
                params: {
                    login: current_data.username,
                    password: new_user_data.password,
                    token: current_data.authorization_token,
                },
            }));

            if (response.status !== 200) {
                throw new Error();
            }

            current_data.password = new_user_data.password;

            yield put(makeAction("USER_DATA_SET", {type: "data", data: current_data}));
        }

        // zmiana tokenu

        if (old_user_data.authorization_token !== new_user_data.authorization_token) {

            const response = yield call(() => apiFetch({
                state,
                method: "PUT",
                url: "/users/update/token",
                params: {
                    login: current_data.username,
                    password: current_data.password,
                    token: new_user_data.authorization_token,
                },
            }));

            if (response.status !== 200) {
                throw new Error();
            }

            current_data.authorization_token = new_user_data.authorization_token;

            yield put(makeAction("USER_DATA_SET", {type: "data", data: current_data}));
        }

    } catch (error) {

        yield put(
            makeAction("NOTIFICATION_ADD", {
                content: "error_msg.user_data_update_failed",
                level: NotificationLevel.Error
            })
        );
    }

    yield put(makeAction("USER_DATA_UPDATING_SET", false));
}
