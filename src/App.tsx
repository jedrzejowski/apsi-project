import React from "react";
import MyLayout from "./components/app/MyLayout";
import {Route, Switch, Redirect} from "react-router-dom";
import DevicePage from "./page/DevicePage";
import {useUserData} from "./redux/reducers/user_data";

import LoginPage from "./page/LoginPage";
import RegisterPage from "./page/RegisterPage";
import Dashboard from "./page/Dashboard";
import MyProfile from "./page/MyProfile";
import makeStyles from "@material-ui/core/styles/makeStyles";
import MyHistory from "./page/MyHistory";

const useStyle = makeStyles({
    "@global": {
        body: {
            maxWidth: "100vw",
            overflowX: "hidden",
            overflowY: "scroll"
        }
    }
}, {name: "App"})

export default function App() {
    const classes = useStyle();
    const user_data = useUserData();

    return <Switch>

        {user_data?.type === "data" ? <>

            <MyLayout>
                <Route path="/device/:deviceId" component={DevicePage}/>
                <Route exact path="/dashboard" component={Dashboard}/>
                <Route exact path="/my-profile" component={MyProfile}/>
                <Route exact path="/my-history" component={MyHistory}/>

            </MyLayout>

        </> : <>

            <Route exact path="/login" component={LoginPage}/>
            <Route exact path="/register" component={RegisterPage}/>
            <Route exact path="/" component={LoginPage}/>

            <Route render={() => <Redirect to="/"/>}/>
        </>}

    </Switch>
}
