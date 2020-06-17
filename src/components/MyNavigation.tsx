import React, {FunctionComponent} from "react";
import {useDeviceList} from "../redux/reducers/device_list";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import DeviceIcon from "./device/DeviceIcon";
import Divider from "@material-ui/core/Divider";
import AppLink from "./lib/AppLink";
import ListItem from "@material-ui/core/ListItem";
import DashboardIcon from '@material-ui/icons/Dashboard';
import useTranslate from "../hooks/useTranslate";
import {useLocation} from "react-router-dom";
import LanguageButton from "./LanguageSwitch";
import TranslateIcon from "@material-ui/icons/Translate";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


function NavItem(props: {
    to?: string
    primary: React.ReactElement | string
    icon?: React.ReactElement
}) {
    const translate = useTranslate();
    const location = useLocation();

    const primary = typeof props.primary === "string" ? translate(props.primary) : props.primary;

    return (
        <AppLink to={props.to ?? "#"}>
            <ListItem selected={location.pathname === props.to}>
                <ListItemIcon>
                    {props.icon ? props.icon : <></>}
                </ListItemIcon>
                <ListItemText primary={primary}/>
            </ListItem>
        </AppLink>
    );
}

export default function Navigation() {
    const device_list = useDeviceList();

    return <>
        <List>

            <NavItem to="/dashboard" primary="page.dashboard.nav_title" icon={<DashboardIcon/>}/>
            <NavItem to="/my-profile" primary="page.my_profile.nav_title" icon={<AccountCircleIcon/>}/>

            <Divider/>

            {device_list?.map((device, i) => {
                return <NavItem
                    key={i} to={`/device/${device.deviceId}`}
                    primary={device.name}
                    icon={<DeviceIcon deviceId={device.deviceId}/>}/>

            })}

            <Divider/>

            <NavItem primary={<LanguageButton type="text"/>} icon={<TranslateIcon/>}/>

        </List>
    </>
}