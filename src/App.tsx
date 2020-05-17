import React, {useEffect} from "react";
import MainLayout from "./components/MainLayout";
import {fetchDeviceList} from "./lib/AppApi";
import {useSelector} from "react-redux";
import {DataT} from "./types";

export default function App() {

    const state = useSelector(state => state) as DataT.AppState;

    useEffect(() => {
        fetchDeviceList(state).then(value => {
            console.log(value);
        })
        // console.log(state);
    }, []);

    return <MainLayout/>
}