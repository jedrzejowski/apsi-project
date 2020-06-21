import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {DataT} from "../../types";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Box from "@material-ui/core/Box";
import {Button} from "@material-ui/core";
import useAppDispatch from "../../hooks/useAppDispatch";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%"
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
    const {
        deviceId: device_id,
        component,
        attribute,
        commands
    } = props;

    function handleCommand(command: DataT.DeviceCapabilityCommand) {
        dispatch("DEVICE_COMMAND_REQUEST", {
            device_id: device_id,
            component_id: component.id,
            capability_name: attribute.name,
            command_name: command.name,
            arguments: []
        })
    }

    return <div className={classes.root}>
        <Toolbar>

            <Typography>
                {attribute.name}
            </Typography>

            <Box flexGrow={1}/>

            {commands.map((command, i) => {
                return <Button key={i} onClick={event => handleCommand(command)}>
                    {command.name}
                </Button>
            })}

        </Toolbar>
    </div>
}


