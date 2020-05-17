import React, {useState} from "react";
import {useDeviceList} from "../redux/reducers/device_list";
import {ListItem} from "@material-ui/core";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DeviceUnknownIcon from '@material-ui/icons/DeviceUnknown';
import {Link as RouterLink} from 'react-router-dom';
import {DataT} from "../types";
import List from "@material-ui/core/List";
import ListItemLink from "./lib/ListItemLink";

export default function AppLeftMenu() {

    const device_list = useDeviceList();


    return <div>
        <List>
            {device_list?.map((device, i) => {
                return <DeviceItem
                    key={device.deviceId}
                    device={device}
                />
            })}
        </List>
    </div>
}

function DeviceItem(props: {
    device: DataT.DeviceShort
}) {

    return <ListItemLink to={`/device/${props.device.deviceId}`}>
        <ListItemIcon>
            <DeviceUnknownIcon/>
        </ListItemIcon>
        <ListItemText primary={props.device.label}/>
    </ListItemLink>
}