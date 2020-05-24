import React from "react"
import {Provider} from "react-redux"
import createStore from "./createStore";

const store = createStore();

export default function (props: { children: React.ReactNode }) {
    return <Provider store={store}>{props.children}</Provider>;
}