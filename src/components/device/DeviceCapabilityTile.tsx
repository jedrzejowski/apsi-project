import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import RemoteObjectPlaceholder from "../lib/RemoteObjectPlaceholder";
import DeviceCapabilityTileButton from "./DeviceCapabilityTileButton";
import {useCapabilitiesTile} from "../../redux/reducers/capabilities_tiles";
import DeviceCapabilityTileAttribute from "./DeviceCapabilityTileAttribute";

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


