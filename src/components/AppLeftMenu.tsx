import React from "react";
import {useDeviceList} from "../redux/reducers/device_list";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DeviceUnknownIcon from '@material-ui/icons/DeviceUnknown';
import {DataT} from "../types";
import List from "@material-ui/core/List";
import ListItemLink from "./lib/ListItemLink";
import DeviceIcon from "./device/DeviceIcon";

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
            <DeviceIcon deviceId={props.device.deviceId}/>
        </ListItemIcon>
        <ListItemText primary={props.device.name}/>
    </ListItemLink>
}