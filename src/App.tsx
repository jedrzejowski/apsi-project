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
import useAppDispatch from "./hooks/useAppDispatch";

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
    const dispatch = useAppDispatch();
    const user_data = useUserData();

    dispatch("TIMER", 10000);

    return <Switch>

        {user_data?.type === "data" ? <>

            <MyLayout>
                <Route path="/device/:deviceId" component={DevicePage}/>
                <Route path="/dashboard" component={Dashboard}/>
                <Route path="/my-profile" component={MyProfile}/>
                <Route path="/my-history" component={MyHistory}/>
                <Route exact path="/" component={Dashboard}/>

            </MyLayout>

        </> : <>

            <Route exact path="/login" component={LoginPage}/>
            <Route exact path="/register" component={RegisterPage}/>
            <Route exact path="/" component={LoginPage}/>

            <Route render={() => <Redirect to="/"/>}/>
        </>}

    </Switch>
}
