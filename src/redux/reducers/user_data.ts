import type {DataT, RemoteObject} from "../../types";
import useAppSelector from "../../hooks/useAppSelector";
import {Action, makeAction} from "../actions";
import {call, put, select, all} from "redux-saga/effects";
import apiFetch from "../../lib/apiFetch";

export function userDataSelector(state: DataT.AppState) {
    return state.user_data ?? null;
}

export function useUserData() {
    return useAppSelector(userDataSelector);
}

export function commitUserData(state: DataT.AppState, data: RemoteObject<DataT.UserData>): DataT.AppState {
    return {
        ...state,
        user_data: data
    }
}

export function* fetchUserLoginSaga(action: Action<"USER_LOGIN">) {
    try {

        const {password, username} = action.data;

        if (username === "" || password === "") {
            yield put(makeAction("USER_DATA_SET", {
                id: action.data.username,
                type: "error",
                error: null
            }));
            return
        }

        yield put(makeAction("USER_DATA_SET", {
            id: action.data.username,
            type: "loading"
        }));

        let response = yield call(() => apiFetch.jsonBody(
            "POST", "/users/login", {login: username, password}
        ));

        if (response.status !== 200) {
            throw new Error();
        }

        let data: any = yield call(() => response.json());
        const authorization_token = data.token;

        response = yield call(() => apiFetch.jsonBody(
            "POST", "/users/info", {
                login: username,
                token: authorization_token
            }
        ));

        if (response.status !== 200) {
            throw new Error();
        }

        data = yield call(() => response.json());

        const {
            name: first_name,
            surname: last_name
        } = data;

        yield put(makeAction("USER_DATA_SET", {
            id: action.data.username,
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
                content: "notification_msg.user_credentials_fail",
                level: "error",
                data: error
            })
        );

        yield put(makeAction("USER_DATA_SET", {
            id: action.data.username,
            type: "error",
            error
        }));
    }
}

export function* fetchUserDataUpdateSaga(action: Action<"USER_DATA_UPDATE">) {
    const new_user_data = action.data;

    try {

        const state: DataT.AppState = yield select();

        if (state.user_data?.type !== "data") {
            throw new Error();
        }

        const old_user_data = state.user_data.data;
        let current_data = old_user_data;

        yield put(makeAction("USER_DATA_SET", {
            id: action.data.username,
            type: "data",
            data: current_data,
            updating: true
        }));

        // zmiana danych osobowych

        if (
            new_user_data.last_name !== old_user_data.last_name ||
            new_user_data.first_name !== old_user_data.first_name
        ) {
            const response = yield call(() => apiFetch.jsonBody(
                "PUT", "/users/update/info", {
                    login: current_data.username,
                    name: new_user_data.first_name,
                    surname: new_user_data.last_name,
                    token: current_data.authorization_token
                }
            ));

            if (response.status !== 200) {
                throw new Error();
            }

            yield call(() => response.text());

            current_data.first_name = new_user_data.first_name;
            current_data.last_name = new_user_data.last_name;

            yield put(makeAction("USER_DATA_SET", {
                id: action.data.username,
                type: "data",
                data: current_data,
                updating: true
            }));
        }

        // zmiana hasła

        if (old_user_data.password !== new_user_data.password) {

            const response = yield call(() => apiFetch.jsonBody(
                "PUT", "/users/update/password", {
                    login: current_data.username,
                    password: new_user_data.password,
                    token: current_data.authorization_token,
                }
            ));

            if (response.status !== 200) {
                throw new Error();
            }

            current_data.password = new_user_data.password;

            yield put(makeAction("USER_DATA_SET", {
                id: action.data.username,
                type: "data",
                data: current_data,
                updating: true
            }));
        }

        // zmiana tokenu

        if (old_user_data.authorization_token !== new_user_data.authorization_token) {

            const response = yield call(() => apiFetch.jsonBody(
                "PUT", "/users/update/token", {
                    login: current_data.username,
                    password: current_data.password,
                    token: new_user_data.authorization_token,
                }
            ));

            if (response.status !== 200) {
                throw new Error();
            }

            current_data.authorization_token = new_user_data.authorization_token;

            yield put(makeAction("USER_DATA_SET", {
                id: action.data.username,
                type: "data",
                data: current_data,
                updating: true
            }));
        }

        yield put(makeAction("USER_DATA_SET", {
            id: action.data.username,
            type: "data",
            data: current_data,
            updating: false
        }));

    } catch (error) {

        yield put(
            makeAction("NOTIFICATION_ADD", {
                content: "notification_msg.user_data_update_failed",
                level: "error"
            })
        );
    }

}

export function* fetchUserRegisterSaga(action: Action<"USER_REGISTER">) {
    try {

        const registration_data = action.data;

        if (
            registration_data.username === "" ||
            registration_data.password === "" ||
            registration_data.authorization_token === "" ||
            registration_data.last_name === "" ||
            registration_data.first_name === ""
        ) {
            yield put(makeAction("USER_DATA_SET", {
                id: action.data.username,
                type: "error",
                error: null
            }));
            return
        }

        yield put(makeAction("USER_DATA_SET", {
            id: action.data.username,
            type: "loading",
        }));

        const response = yield call(() => apiFetch({
            method: "POST",
            url: "/users/create",
            body: {
                login: registration_data.username,
                name: registration_data.first_name,
                password: registration_data.password,
                surname: registration_data.last_name,
                token: registration_data.authorization_token
            }
        }));

        if (response.status !== 200) {
            throw new Error();
        }

        const data: string = yield call(() => response.text());

        if (data !== "user created") {
            throw new Error();
        }

        yield put(makeAction("USER_LOGIN", {
            username: registration_data.username,
            password: registration_data.password
        }));

    } catch (error) {

        yield put(
            makeAction("NOTIFICATION_ADD", {
                content: "notification_msg.registration_fail",
                level: "error"
            })
        );

        yield put(makeAction("USER_DATA_SET", {
            id: action.data.username,
            type: "error",
            error
        }));
    }
}
