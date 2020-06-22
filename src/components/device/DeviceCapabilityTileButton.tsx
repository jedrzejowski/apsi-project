import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import useAppDispatch from "../../hooks/useAppDispatch";
import {useCapabilitiesTile} from "../../redux/reducers/capabilities_tiles";
import RemoteObjectPlaceholder from "../lib/RemoteObjectPlaceholder";
import {DataT} from "../../types";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import useTranslate from "../../i18n/useTranslate";
import {useDeviceShort} from "../../redux/reducers/device_list";
import {DialogActions} from "@material-ui/core";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {useDevicesCapabilityStatus} from "../../redux/reducers/devices_capability_status";

const useStyles = makeStyles((theme) => ({
    attributeInputTitle: {
        textTransform: "uppercase"
    }
}), {name: "DeviceCapabilityTileButton"});

export default function DeviceCapabilityTileButton(props: {
    size?: "small" | "medium" | "large"
    deviceId: string
    capabilityName: string
    commandName: string
}) {
    const classes = useStyles();
    const dispatch = useAppDispatch();
    const translate = useTranslate();
    const device_short = useDeviceShort(props.deviceId);
    const capability_tile = useCapabilitiesTile(props.deviceId, props.capabilityName);
    const devices_capability_status = useDevicesCapabilityStatus(props.deviceId, props.capabilityName)
    const [dialog_open, setDialogOpen] = useState(false);
    const [argument_values, setArgumentValues] = useState<any[]>([]);

    if (
        capability_tile.type !== "data" ||
        device_short.type !== "data" ||
        devices_capability_status.type !== "data"
    ) {
        return (
            <Button>
                <RemoteObjectPlaceholder
                    object={[capability_tile, device_short, devices_capability_status]}
                    variant="text"/>
            </Button>
        );
    }


    const command = capability_tile.data.commands.find(cmd => cmd.name === props.commandName) as DataT.DeviceCapabilityCommand;
    const command_attributes = capability_tile.data.attributes.filter(attribute => command.arguments.includes(attribute.name));

    function handleCommand() {

        if (command.arguments.length > 0) {

            if (dialog_open) {
                setDialogOpen(false);
            } else {
                setArgumentValues(command_attributes.map(attribute =>
                    //@ts-ignore
                    devices_capability_status.data[attribute.name].value));
                setDialogOpen(true);
                return;
            }
        }

        dispatch("DEVICE_COMMAND_REQUEST", {
            device_id: props.deviceId,
            capability_name: props.capabilityName,
            command_name: props.commandName,
            arguments: argument_values
        });
    }

    function handleCancelCommand() {
        setDialogOpen(false)
    }

    function setArgumentValue(index: number, value: any) {
        let new_argument_values = [...argument_values];
        new_argument_values[index] = value;
        setArgumentValues(new_argument_values);
    }

    return <>
        <Button onClick={handleCommand} size={props.size}>
            {command.name}
        </Button>
        <Dialog open={dialog_open}>
            <DialogTitle>
                {device_short.data.name}::{command.name}
            </DialogTitle>
            <List>
                {command_attributes.map((attribute, i) => (
                    <ListItem key={command.name}>
                        <Box flexGrow={1}>
                            <Typography className={classes.attributeInputTitle}>
                                {attribute.name}
                            </Typography>
                            <AttributeInput deviceId={props.deviceId}
                                            capabilityName={props.capabilityName}
                                            attribute={attribute}
                                            value={argument_values[i]}
                                            onChange={new_value => setArgumentValue(i, new_value)}/>
                        </Box>
                    </ListItem>
                ))}
            </List>
            <DialogActions>
                <Button onClick={handleCancelCommand} color="primary">
                    Disagree
                </Button>
                <Button onClick={handleCommand} color="primary" autoFocus>
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    </>;
}

interface AttributeInputProps<T> {
    deviceId: string
    capabilityName: string
    attribute: T
    value: any
    onChange: (new_value: any) => void
}

function AttributeInput(props: AttributeInputProps<DataT.DeviceCapabilityAttribute>) {
    switch (props.attribute.type) {
        case "integer":
            return <IntegerAttributeInput {...props} attribute={props.attribute}/>
        default:
            return null
    }
}

function IntegerAttributeInput(props: AttributeInputProps<DataT.DeviceCapabilityAttributeInteger>) {

    return (
        <Slider
            value={props.value}
            onChange={(event, value) => props.onChange(value)}
            valueLabelDisplay="auto"
            min={props.attribute.minimum}
            max={props.attribute.maximum}
        />
    )
}
