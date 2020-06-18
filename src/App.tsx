import React from "react";
import MyLayout from "./components/app/MyLayout";
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

            <MyLayout>
                <Route exact path="/device/:deviceId" component={DevicePage}/>
                <Route exact path="/dashboard" component={Dashboard}/>
                <Route exact path="/my-profile" component={MyProfile}/>
                <Route exact path="/" component={Dashboard}/>
            </MyLayout>

        </> : <>

            <Route exact path="/login" component={LoginPage}/>
            <Route exact path="/register" component={RegisterPage}/>
            <Route exact path="/" component={LoginPage}/>

        </>}
    </Switch>
}
