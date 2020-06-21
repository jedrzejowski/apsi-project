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
import DeviceCapabilityCommandButton from "./DeviceCapabilityCommandButton";

const useStyles = makeStyles({
    root: {},
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
});

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
            <CardActions>
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

    const attribute = capability_tiles?.data[0]?.attributes[0];

    if (!attribute) {
        return null
    }

    const commands = capability_tiles.data[0].commands.filter(command => attribute.possibleValues.includes(command.name));


    return <DeviceCommand deviceId={device_id}
                          componentId="main"
                          attribute={attribute}
                          commands={commands}/>;
}

function DeviceCommand(props: {
    deviceId: string
    componentId: string
    attribute: DataT.DeviceCapabilityAttribute
    commands: DataT.DeviceCapabilityCommand[]
}) {

    const device_capability_status = useDevicesCapabilityStatus(props.deviceId, props.attribute.name ?? "");


    return <Box display="flex" style={{width: "100%"}}>

        <Box display="flex" justifyContent="center" flexDirection="column">
            <Typography component="span">
                {device_capability_status.type === "data" ? (
                    device_capability_status.data.value
                ) : <RemoteObjectPlaceholder object={device_capability_status} variant="text"/>}
            </Typography>
        </Box>

        <Box flexGrow={1}/>

        {props.commands.map((command, i) => {
            return <DeviceCapabilityCommandButton
                key={i}
                deviceId={props.deviceId}
                componentId={props.componentId}
                capabilityName={props.attribute.name}
                commandName={command.name}/>
        })}
    </Box>;
}