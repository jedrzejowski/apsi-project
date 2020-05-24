import React, {useEffect} from "react";
import MainLayout from "./components/MainLayout";
import {HashRouter as Router, Route, Switch} from "react-router-dom";
import DeviceDetails from "./components/DeviceDetails";

export default function App() {


    return <Router>
        <MainLayout>
            <Switch>
                <Route path="/device/:deviceId" component={DeviceDetails}/>
                <Route path="/">
                    Home
                </Route>
            </Switch>
        </MainLayout>
    </Router>
}