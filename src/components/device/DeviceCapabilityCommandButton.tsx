import React from "react";
import Button from "@material-ui/core/Button";
import useAppDispatch from "../../hooks/useAppDispatch";
import {useCapabilitiesTiles} from "../../redux/reducers/capabilities_tiles";
import {useDeviceDetails} from "../../redux/reducers/device_details";
import RemoteObjectPlaceholder from "../lib/RemoteObjectPlaceholder";

export default function DeviceCapabilityCommandButton(props: {
    deviceId: string
    componentId: string
    capabilityName: string
    commandName: string
}) {
    const dispatch = useAppDispatch();
    const device_details = useDeviceDetails(props.deviceId);
    const capability_tiles = useCapabilitiesTiles(props.deviceId);

    if (capability_tiles.type !== "data" || device_details.type !== "data") {
        return <Button>
            <RemoteObjectPlaceholder object={[capability_tiles, device_details]} variant="text"/>
        </Button>
    }

    const component_index = device_details.data.components.findIndex(component => component.id === props.componentId);

    if (component_index < 0) {
        throw new Error();
    }

    const component = device_details.data.components[component_index];
    const capability_tile = capability_tiles.data[component_index];

    const attribute = capability_tile.attributes.find(attribute => attribute.name === props.capabilityName);
    const command = capability_tile.commands.find(command => command.name === props.commandName);

    if (!attribute || !command) {
        throw new Error();
    }

    function handleCommand() {
        dispatch("DEVICE_COMMAND_REQUEST", {
            device_id: props.deviceId,
            component_id: component.id,
            capability_name: attribute?.name ?? "",
            command_name: command?.name ?? "",
            arguments: []
        })
    }

    return (
        <Button onClick={handleCommand}>
            {command.name}
        </Button>
    );
}