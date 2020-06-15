import React from "react";
import MainLayout from "./components/MainLayout";
import {Route, Switch} from "react-router-dom";
import DeviceDetails from "./components/DeviceDetails";
import {useCredentials} from "./redux/reducers/credentials";
import LoginPage from "./page/LoginPage";
import RegisterPage from "./page/RegisterPage";

export default function App() {
    const credentials = useCredentials();

    return <Switch>

        {credentials?.type === "data" ? <>

            <MainLayout>
                <Route path="/device/:deviceId" component={DeviceDetails}/>
                <Route path="/">
                    Home
                </Route>
            </MainLayout>

        </> : <>

            <Route path="/login" exact component={LoginPage}/>
            <Route path="/register" exact component={RegisterPage}/>
            <Route path="/" exact component={LoginPage}/>

        </>}
    </Switch>
}