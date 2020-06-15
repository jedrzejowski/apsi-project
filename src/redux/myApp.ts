import type {Action, Actions} from "./actions";
import {DataT} from "../types";
import {default_backend_url} from "../const";
import {commitDeviceListSet} from "./reducers/device_list";
import {commitDeviceDetailsSet} from "./reducers/device_details";
import {commitCredentialsSet} from "./reducers/credentials";

const initial_state: DataT.AppState = {
    backend_url: default_backend_url,
};

const commit_dictionary: {
    [Key in keyof Actions]?: (state: DataT.AppState, action: Actions[Key]) => DataT.AppState
} = {
    CREDENTIALS_SET: commitCredentialsSet,
    DEVICE_LIST_SET: commitDeviceListSet,
    DEVICE_DETAILS_SET: commitDeviceDetailsSet
}

export default function myApp<Key extends keyof Actions>(
    state: DataT.AppState = initial_state,
    action: Action<Key>
): DataT.AppState {

    const commit = commit_dictionary[action.type];
    if (commit) {
        return commit(state, action.data);
    }

    return state;
}