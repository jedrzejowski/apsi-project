import type {Action, Actions} from "./actions";
import type {DataT} from "../types";
import {commitDeviceListSet} from "./reducers/device_list";
import {commitDeviceDetailsSet} from "./reducers/device_details";
import {commitUserData} from "./reducers/user_data";
import {commitNotificationAdd} from "./reducers/notifications";
import {commitCapabilitiesTilesSet} from "./reducers/capabilities_tiles";
import {commitDeviceHistorySet} from "./reducers/device_history";
import {commitUserHistorySet} from "./reducers/user_history";
import {commitDevicesCapabilityStatusSet} from "./reducers/devices_capability_status";

const initial_state: DataT.AppState = {
    // user_data: {
    //     id: "test3",
    //     data: {
    //         authorization_token: "Bearer 3fe718bb-ea6e-485a-901a-042799f279d6",
    //         first_name: "Janusz",
    //         last_name: "Kowalski",
    //         password: "123456",
    //         username: "test3"
    //     },
    //     type: "data"
    // }
};

const commit_dictionary: {
    [Key in keyof Actions]?: (state: DataT.AppState, action: Actions[Key]) => DataT.AppState
} = {
    USER_LOGOUT: () => initial_state,
    USER_DATA_SET: commitUserData,
    USER_HISTORY_SET: commitUserHistorySet,

    DEVICE_LIST_SET: commitDeviceListSet,
    DEVICE_DETAILS_SET: commitDeviceDetailsSet,
    DEVICE_HISTORY_SET: commitDeviceHistorySet,
    DEVICE_CAPABILITIES_STATUS_SET: commitDevicesCapabilityStatusSet,

    CAPABILITIES_TILES_SET: commitCapabilitiesTilesSet,

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