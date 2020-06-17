import React from "react";
import MainLayout from "./components/MainLayout";
import {Route, Switch} from "react-router-dom";
import DevicePage from "./page/DevicePage";
import {useCredentials} from "./redux/reducers/credentials";

import LoginPage from "./page/LoginPage";
import RegisterPage from "./page/RegisterPage";
import Dashboard from "./page/Dashboard";
import MyProfile from "./page/MyProfile";

export default function App() {
    const credentials = useCredentials();

    return <Switch>

        {credentials?.type === "data" ? <>

            <MainLayout>
                <Route exact path="/device/:deviceId" component={DevicePage}/>
                <Route exact path="/dashboard" component={Dashboard}/>
                <Route exact path="/my-profile" component={MyProfile}/>
                <Route exact path="/" component={Dashboard}/>
            </MainLayout>

        </> : <>

            <Route path="/login" exact component={LoginPage}/>
            <Route path="/register" exact component={RegisterPage}/>
            <Route path="/" component={LoginPage}/>

        </>}
    </Switch>
}
