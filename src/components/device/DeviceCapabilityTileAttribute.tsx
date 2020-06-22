import React from "react";
import {useCapabilitiesTile} from "../../redux/reducers/capabilities_tiles";
import {useDeviceDetails} from "../../redux/reducers/device_details";
import RemoteObjectPlaceholder from "../lib/RemoteObjectPlaceholder";
import Typography from "@material-ui/core/Typography";
import useTranslate from "../../i18n/useTranslate";
import {useDevicesCapabilityStatus} from "../../redux/reducers/devices_capability_status";

export default function DeviceCapabilityTileAttribute(props: {
    deviceId: string
    capabilityName: string
    attributeName: string
}) {
    const translate = useTranslate();
    const device_details = useDeviceDetails(props.deviceId);
    const capability_tile = useCapabilitiesTile(props.deviceId, props.capabilityName);
    const device_capability_status = useDevicesCapabilityStatus(props.deviceId, props.capabilityName);

    if (capability_tile.type !== "data" || device_details.type !== "data") {
        return (
            <RemoteObjectPlaceholder object={[capability_tile, device_details]} variant="text"/>
        );
    }

    const attribute = capability_tile.data.attributes.find(attribute => {
        return attribute.name === props.attributeName
    });

    if (!attribute) {
        throw new Error();
    }

    return <>
        <Typography component="span">
            {translate("page.device.commands.name_label")}
        </Typography>

        <Typography component="span">
            {attribute.name}
        </Typography>

        <Typography component="span">
            {translate("page.device.commands.value_label")}
        </Typography>

        <Typography component="span">
            {device_capability_status.type === "data" ? (
                device_capability_status.data[attribute.name].value
            ) : (<RemoteObjectPlaceholder object={device_capability_status} variant="text"/>)}
        </Typography>
    </>;
}