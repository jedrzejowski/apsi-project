import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {DataT} from "../../types";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Box from "@material-ui/core/Box";
import {Button} from "@material-ui/core";
import useAppDispatch from "../../hooks/useAppDispatch";
import RemoteObjectPlaceholder from "../lib/RemoteObjectPlaceholder";
import {useDevicesCapabilityStatus} from "../../redux/reducers/devices_capability_status";
import useTranslate from "../../i18n/useTranslate";
import DeviceCapabilityCommandButton from "./DeviceCapabilityCommandButton";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%"
    },
    info_text: {
        color: theme.palette.text.secondary,
        paddingRight: theme.spacing(1),
        fontSize: "0.9em"
    },
    value_text: {
        color: theme.palette.text.primary,
        paddingRight: theme.spacing(3)
    }
}))

export default function DeviceCommand(props: {
    deviceId: string
    component: DataT.DeviceComponent
    attribute: DataT.DeviceCapabilityAttribute
    commands: DataT.DeviceCapabilityCommand[]
}) {
    const classes = useStyles();
    const dispatch = useAppDispatch();
    const translate = useTranslate();
    const {
        deviceId: device_id,
        component,
        attribute,
        commands
    } = props;

    const device_capability_status = useDevicesCapabilityStatus(device_id, attribute.name);

    return <div className={classes.root}>
        <Toolbar>

            <Typography component="span" className={classes.info_text}>
                {translate("page.device.commands.name_label")}
            </Typography>

            <Typography component="span" className={classes.value_text}>
                {attribute.name}
            </Typography>

            <Typography component="span" className={classes.info_text}>
                {translate("page.device.commands.value_label")}
            </Typography>

            <Typography component="span" className={classes.value_text}>
                {device_capability_status.type === "data" ? (
                    device_capability_status.data.value
                ) : (<RemoteObjectPlaceholder object={device_capability_status} variant="text"/>)}
            </Typography>

            <Box flexGrow={1}/>

            {commands.map((command, i) => {
                return <DeviceCapabilityCommandButton
                    key={i}
                    deviceId={props.deviceId}
                    componentId={props.component.id}
                    capabilityName={attribute.name}
                    commandName={command.name}/>
            })}

        </Toolbar>
    </div>
}


