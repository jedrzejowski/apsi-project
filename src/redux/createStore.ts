import createSagaMiddleware from "redux-saga";
import {applyMiddleware, createStore} from "redux";
import myApp from "./myApp";
import mySaga from "./mySaga";

export default function () {
    let middlewares = [];

    const sagaMiddleware = createSagaMiddleware();
    middlewares.push(sagaMiddleware);

    const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

    // @ts-ignore
    const store = createStoreWithMiddleware(myApp);

    sagaMiddleware.run(mySaga);

    return store;
};
