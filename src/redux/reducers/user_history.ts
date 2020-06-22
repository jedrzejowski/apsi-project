import {DataT, RemoteObject} from "../../types";
import apiFetch from "../../lib/apiFetch";
import {Action, makeAction} from "../actions";
import {select, call, put} from "redux-saga/effects";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";

export function userHistorySelector(state: DataT.AppState, user_id: string) {
    return state.user_history?.[user_id] ?? null;
}

export function useUserHistory(user_id: string): RemoteObject<DataT.HistoryEntry[]> {
    const dispatch = useAppDispatch();
    const user_history = useAppSelector(state => userHistorySelector(state, user_id));

    if (!user_history) {
        dispatch("USER_HISTORY_REQUEST", user_id);
        return {
            id: user_id,
            type: "loading"
        };
    }

    if (user_history.type === "data" && user_history.needUpdate) {
        dispatch("USER_HISTORY_REQUEST", user_id);
    }

    return user_history;
}

export function commitUserHistorySet(state: DataT.AppState, data: RemoteObject<DataT.HistoryEntry[]>): DataT.AppState {

    return {
        ...state,
        user_history: {
            ...state.user_history,
            [data.id]: data
        }
    }
}

export function* fetchUserHistorySaga(action: Action<"USER_HISTORY_REQUEST">) {
    const user_id = action.data;

    try {
        const response = yield call(() => apiFetch({
            method: "GET",
            url: "/history/user",
            params: {userLogin: user_id}
        }));

        if (response.status !== 200) {
            throw new Error();
        }

        const history = yield call(() => response.json());

        yield put(makeAction("USER_HISTORY_SET", {
            id: user_id,
            type: "data",
            data: history
        }));
    } catch (error) {

        yield put(makeAction("USER_HISTORY_SET", {
            id: user_id,
            type: "error",
            error
        }));

        yield put(
            makeAction("NOTIFICATION_ADD", {
                content: "notification_msg.unknown_error",
                level: "error"
            })
        );
    }
}
