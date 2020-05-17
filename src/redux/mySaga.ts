import {
    takeLeading as takeLeadingSaga,
    takeEvery as takeEverySaga
} from "redux-saga/effects";
import type {Action, Actions} from "./actions";
import {fetchDeviceListSaga} from "./reducers/device_list";
import {fetchDeviceDetailsSaga} from "./reducers/device_details";

let takeLeading = <Key extends keyof Actions>(name: Key, f: (action: Action<Key>) => any) => takeLeadingSaga(name, f);
let takeEvery = <Key extends keyof Actions>(name: Key, f: (action: Action<Key>) => any) => takeEverySaga(name, f);

export default function* mySaga() {
    yield takeLeading("DEVICE_LIST_REQUEST", fetchDeviceListSaga);
    yield takeLeading("DEVICE_DETAILS_REQUEST", fetchDeviceDetailsSaga);
}