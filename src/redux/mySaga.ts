import {
    takeLeading as takeLeadingSaga,
    takeEvery as takeEverySaga
} from "redux-saga/effects";
import type {Action, Actions} from "./actions";
import {fetchDeviceListSaga} from "./reducers/device_list";
import {fetchDeviceDetailsSaga} from "./reducers/device_details";
import {fetchUserDataUpdateSaga, fetchUserLoginSaga, fetchUserRegisterSaga} from "./reducers/user_data";

let takeLeading = <Key extends keyof Actions>(name: Key, f: (action: Action<Key>) => any) => takeLeadingSaga(name, f);
let takeEvery = <Key extends keyof Actions>(name: Key, f: (action: Action<Key>) => any) => takeEverySaga(name, f);

export default function* mySaga() {
    yield takeLeading("DEVICE_LIST_REQUEST", fetchDeviceListSaga);
    yield takeLeading("USER_LOGIN", fetchUserLoginSaga);
    yield takeLeading("USER_DATA_UPDATE", fetchUserDataUpdateSaga);
    yield takeLeading("USER_REGISTER", fetchUserRegisterSaga);
    yield takeEvery("DEVICE_DETAILS_REQUEST", fetchDeviceDetailsSaga);
}