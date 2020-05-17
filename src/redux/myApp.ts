import type {Action, Actions} from "./actions";
import {DataT} from "../types";
import {default_backend_url} from "../const";
import {commitDeviceListSet} from "./reducers/device_list";
import {commitDeviceDetailsSet} from "./reducers/device_details";

const initial_state: DataT.AppState = {
    backend_url: default_backend_url,
    authorization: "Bearer 3fe718bb-ea6e-485a-901a-042799f279d6"
};

export default function myApp(state: DataT.AppState = initial_state, action: Action): DataT.AppState {

    let type: keyof Actions = action.type;

    switch (type) {

        case "DEVICE_LIST_SET":
            return commitDeviceListSet(state, action);

        case "DEVICE_DETAILS_SET":
            return commitDeviceDetailsSet(state, action);

        default:
            return state;
    }
}