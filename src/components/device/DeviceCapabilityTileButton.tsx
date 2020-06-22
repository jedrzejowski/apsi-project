import React from "react";
import Button from "@material-ui/core/Button";
import useAppDispatch from "../../hooks/useAppDispatch";
import {useCapabilitiesTile} from "../../redux/reducers/capabilities_tiles";
import {useDeviceDetails} from "../../redux/reducers/device_details";
import RemoteObjectPlaceholder from "../lib/RemoteObjectPlaceholder";

export default function DeviceCapabilityTileButton(props: {
    size?: "small" | "medium" | "large"
    deviceId: string
    capabilityName: string
    commandName: string
}) {
    const dispatch = useAppDispatch();
    const device_details = useDeviceDetails(props.deviceId);
    const capability_tile = useCapabilitiesTile(props.deviceId, props.capabilityName);

    if (capability_tile.type !== "data" || device_details.type !== "data") {
        return (
            <Button>
                <RemoteObjectPlaceholder object={[capability_tile, device_details]} variant="text"/>
            </Button>
        );
    }

    const command = capability_tile.data.commands.find(cmd => {
        return cmd.name === props.commandName
    });

    if (!command) {
        throw new Error();
    }

    function handleCommand() {
        dispatch("DEVICE_COMMAND_REQUEST", {
            device_id: props.deviceId,
            capability_name: props.capabilityName,
            command_name: props.commandName,
            arguments: []
        })
    }

    return (
        <Button onClick={handleCommand} size={props.size}>
            {command.name}
        </Button>
    );
}