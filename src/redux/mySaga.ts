import {
    takeLeading as takeLeadingSaga,
    takeEvery as takeEverySaga
} from "redux-saga/effects";
import type {Action, Actions} from "./actions";
import {fetchDeviceListSaga} from "./reducers/device_list";
import {fetchDeviceDetailsSaga} from "./reducers/device_details";
import {fetchUserDataUpdateSaga, fetchUserLoginSaga, fetchUserRegisterSaga} from "./reducers/user_data";
import {fetchCapabilitiesTilesSaga} from "./reducers/capabilities_tiles";
import {fetchDeviceAddToAppRequestSaga, fetchDeviceCommandRequestSaga} from "./reducers/device_command";
import {fetchDeviceHistorySaga} from "./reducers/device_history";
import {fetchUserHistorySaga} from "./reducers/user_history";
import {fetchDeviceCapabilityStatusRequestSaga} from "./reducers/devices_capability_status";
import {timerSaga} from "./reducers/timer";

let takeLeading = <Key extends keyof Actions>(name: Key, f: (action: Action<Key>) => any) => takeLeadingSaga(name, f);
let takeEvery = <Key extends keyof Actions>(name: Key, f: (action: Action<Key>) => any) => takeEverySaga(name, f);

export default function* mySaga() {
    yield takeLeading("USER_LOGIN", fetchUserLoginSaga);
    yield takeLeading("USER_DATA_UPDATE", fetchUserDataUpdateSaga);
    yield takeLeading("USER_REGISTER", fetchUserRegisterSaga);
    yield takeLeading("USER_HISTORY_REQUEST", fetchUserHistorySaga);

    yield takeEvery("DEVICE_DETAILS_REQUEST", fetchDeviceDetailsSaga);
    yield takeLeading("DEVICE_LIST_REQUEST", fetchDeviceListSaga);
    yield takeEvery("DEVICE_COMMAND_REQUEST", fetchDeviceCommandRequestSaga);
    yield takeLeading("DEVICE_HISTORY_REQUEST", fetchDeviceHistorySaga);
    yield takeEvery("DEVICE_CAPABILITIES_STATUS_REQUEST", fetchDeviceCapabilityStatusRequestSaga);
    yield takeLeading("DEVICE_ADD_TO_APP_REQUEST", fetchDeviceAddToAppRequestSaga);

    yield takeEvery("CAPABILITIES_TILES_REQUEST", fetchCapabilitiesTilesSaga);

    yield takeLeading("TIMER", timerSaga);
}