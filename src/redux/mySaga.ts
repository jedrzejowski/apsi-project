import {
    takeLeading as takeLeadingSaga,
    takeEvery as takeEverySaga
} from "redux-saga/effects";
import type {Action, Actions} from "./actions";

let takeLeading = <Key extends keyof Actions>(name: Key, f: (action: Action<Key>) => any) => takeLeadingSaga(name, f);
let takeEvery = <Key extends keyof Actions>(name: Key, f: (action: Action<Key>) => any) => takeEverySaga(name, f);

export default function* mySaga() {

}