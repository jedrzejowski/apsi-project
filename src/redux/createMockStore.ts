import configureStore, {MockStoreEnhanced} from "redux-mock-store";
import {DataT} from "../types";
import {createStore} from "redux";
import myApp from "./myApp";

const createMockStore = configureStore([]);

export type MockStoreI = MockStoreEnhanced<DataT.AppState, {}>;

export default function (): MockStoreI {
    return createStore(myApp) as MockStoreI;
}