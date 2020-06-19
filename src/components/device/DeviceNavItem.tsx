import React, {useState} from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DeviceIcon from "./DeviceIcon";
import Collapse from "@material-ui/core/Collapse";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DevicesOtherIcon from '@material-ui/icons/DevicesOther'
import {useDeviceList} from "../../redux/reducers/device_list";
import NavItem from "../app/MyNavItem";
import useTranslate from "../../i18n/useTranslate";

export default function DeviceNavItem() {
    const device_list = useDeviceList();
    const translate = useTranslate();
    const [open, setOpen] = useState(true);

    function handleClick() {
        setOpen(!open);
    }

    return <>
        <ListItem button onClick={handleClick}>
            <ListItemIcon>
                <DevicesOtherIcon/>
            </ListItemIcon>
            <ListItemText primary={translate("page.device.nav_group_label")}/>
            {open ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
        </ListItem>

        <Collapse in={open} timeout="auto" unmountOnExit>

            {device_list?.map((device, i) => {
                return <NavItem
                    key={i}
                    depth={1}
                    to={`/device/${device.deviceId}`}
                    primary={device.name}
                    icon={<DeviceIcon deviceId={device.deviceId}/>}/>
            })}

        </Collapse>
    </>
}