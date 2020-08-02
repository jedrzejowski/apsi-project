import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {useCapabilitiesTiles} from "../../redux/reducers/capabilities_tiles";
import {useDeviceShort} from "../../redux/reducers/device_list";
import RemoteObjectPlaceholder from "../lib/RemoteObjectPlaceholder";
import Box from "@material-ui/core/Box";
import {DataT} from "../../types";
import useAppDispatch from "../../hooks/useAppDispatch";
import {useDevicesCapabilityStatus} from "../../redux/reducers/devices_capability_status";
import DeviceCapabilityTileButton from "./DeviceCapabilityTileButton";
import DeviceCapabilityTile from "./DeviceCapabilityTile";

const useStyles = makeStyles(theme => ({
    root: {},
    action_root: {
        paddingLeft: theme.spacing(2)
    },
    bullet: {
        display: "inline-block",
        margin: "0 2px",
        transform: "scale(0.8)",
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
}), {name: "DeviceDashboardItem"});

export default function DeviceDashboardItem(props: {
    deviceId: string
}) {
    const classes = useStyles();
    const device_short = useDeviceShort(props.deviceId);

    return (
        <Card className={classes.root}>
            <CardContent>

                {device_short.type === "data" ? (<>
                    <Typography color="textSecondary" variant="body2">
                        {device_short.data.dth.deviceTypeName}
                    </Typography>
                    <Typography variant="h5">
                        {device_short.data.name}
                    </Typography>
                </>) : (<RemoteObjectPlaceholder object={device_short}/>)}

            </CardContent>
            <CardActions className={classes.action_root}>
                <FirstCapability deviceId={props.deviceId}/>
            </CardActions>
        </Card>
    );
}


function FirstCapability(props: {
    deviceId: string
}) {
    const {
        deviceId: device_id
    } = props;

    const capability_tiles = useCapabilitiesTiles(props.deviceId);

    if (capability_tiles.type !== "data") {
        return <RemoteObjectPlaceholder object={capability_tiles} variant="text"/>
    }

    if (capability_tiles.data.length === 0) {
        return null;
    }


    return <DeviceCapabilityTile
        size="small"
        deviceId={device_id}
        capabilityName={capability_tiles.data[0].capabilityName}/>;
}
