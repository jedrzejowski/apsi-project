import type {Action, Actions} from "./actions";
import {DataT} from "../types";
import {commitDeviceListSet} from "./reducers/device_list";
import {commitDeviceDetailsSet} from "./reducers/device_details";
import {commitUserData, commitUserDataUpdating} from "./reducers/user_data";
import {commitNotificationAdd} from "./reducers/notifications";

const initial_state: DataT.AppState = {};

const commit_dictionary: {
    [Key in keyof Actions]?: (state: DataT.AppState, action: Actions[Key]) => DataT.AppState
} = {
    USER_DATA_SET: commitUserData,
    USER_DATA_UPDATING_SET: commitUserDataUpdating,
    DEVICE_LIST_SET: commitDeviceListSet,
    DEVICE_DETAILS_SET: commitDeviceDetailsSet,
    NOTIFICATION_ADD: commitNotificationAdd
}

export default function myApp<Key extends keyof Actions>(
    state: DataT.AppState = initial_state,
    action: Action<Key>
): DataT.AppState {

    const commit = commit_dictionary[action.type];
    if (commit) {
        // @ts-ignore
        state = commit(state, action.data);
    }

    console.log(state);

    return state;
}