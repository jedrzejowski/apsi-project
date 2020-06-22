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
import DeviceCapabilityTileButton from "./DeviceCapabilityTileButton";
import {useCapabilitiesTile, useCapabilitiesTiles} from "../../redux/reducers/capabilities_tiles";
import DeviceCapabilityTileAttribute from "./DeviceCapabilityTileAttribute";

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

export default function DeviceCapabilityTile(props: {
    size?: "small" | "medium" | "large"
    children?: React.ReactNode
    deviceId: string
    capabilityName: string

}) {
    const size = props.size ?? "medium";
    const capability_tile = useCapabilitiesTile(props.deviceId, props.capabilityName);

    if (capability_tile.type !== "data") {
        return <RemoteObjectPlaceholder object={capability_tile}/>
    }

    const attributes = capability_tile.data.attributes.map((attribute, i) => {
        return <DeviceCapabilityTileAttribute
            key={i}
            deviceId={props.deviceId}
            capabilityName={props.capabilityName}
            attributeName={attribute.name}/>
    });

    const commands = capability_tile.data.commands.map((command, i) => {
        return <DeviceCapabilityTileButton
            key={i}
            size={size}
            deviceId={props.deviceId}
            capabilityName={props.capabilityName}
            commandName={command.name}/>
    });

    switch (size) {

        case "large":
        case "medium":
            return (
                <Toolbar>
                    {attributes}
                    <Box flexGrow={1}/>
                    {commands}
                </Toolbar>
            )

        case "small":
            return (
                <Box display="flex" flexDirection="row" alignItems="center" style={{width: "100%"}}>
                    {attributes}
                    <Box flexGrow={1}/>
                    {commands}
                </Box>
            )

        default:
            throw new Error();
    }
}


