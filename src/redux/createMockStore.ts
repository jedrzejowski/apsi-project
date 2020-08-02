import configureStore, {MockStoreEnhanced} from "redux-mock-store";
import type {DataT} from "../types";
import {createStore} from "redux";
import myApp from "./myApp";

const createMockStore = configureStore([]);

export type MockStoreI = MockStoreEnhanced<DataT.AppState, {}>;

export default function (): MockStoreI {
    // @ts-ignore
    return createStore(myApp) as MockStoreI;
}