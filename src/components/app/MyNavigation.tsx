import React, {FunctionComponent} from "react";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import DashboardIcon from '@material-ui/icons/Dashboard';
import LanguageButton from "../../i18n/LanguageSwitch";
import TranslateIcon from "@material-ui/icons/Translate";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DeviceNavItem from "../device/DeviceNavItem";
import NavItem from "./MyNavItem";


export default function Navigation(props: {
    onClick?: () => void
}) {
    return <>
        <List>

            <NavItem to="/dashboard" primary="page.dashboard.nav_title" icon={<DashboardIcon/>}/>
            <NavItem to="/my-profile" primary="page.profile.nav_title" icon={<AccountCircleIcon/>}/>

            <Divider/>

            <DeviceNavItem/>

            <Divider/>

            <NavItem primary={<LanguageButton type="text"/>} icon={<TranslateIcon/>}/>

        </List>
    </>
}