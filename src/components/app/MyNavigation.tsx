import React from "react";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DeviceNavItem from "../device/DeviceNavItem";
import NavItem from "./MyNavItem";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import useAppDispatch from "../../hooks/useAppDispatch";
import {useHistory} from "react-router-dom";


export default function (props: {
    onClick?: () => void
}) {
    const dispatch = useAppDispatch();
    const history = useHistory();

    function handleLogout() {
        dispatch("USER_LOGOUT", undefined);
        history.push("/")
    }

    return <>
        <List onClick={props.onClick}>

            <NavItem to="/dashboard" primary="page.dashboard.nav_title" icon={<DashboardIcon/>}/>

            <Divider/>

            <DeviceNavItem/>

            <Divider/>

            <NavItem to="/my-profile" primary="page.profile.nav_title" icon={<AccountCircleIcon/>}/>

            <NavItem primary="page.profile.logout" icon={<ExitToAppIcon/>} onClick={handleLogout}/>

        </List>
    </>
}