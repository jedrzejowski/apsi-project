import React, {useState} from "react";
import {useCapabilitiesTiles} from "../../redux/reducers/capabilities_tiles";
import SliceOfBread from "../app/SliceOfBread";
import RemoteObjectPlaceholder from "../lib/RemoteObjectPlaceholder";
import DeviceCapabilityTile from "./DeviceCapabilityTile";
import {useDeviceDetails} from "../../redux/reducers/device_details";
import MissingPlaceholder from "../lib/MissingPlaceholder";

export default function DeviceCommands(props: {
    deviceId: string
}) {
    const capabilities_tiles = useCapabilitiesTiles(props.deviceId);
    const device_details = useDeviceDetails(props.deviceId);

    const slice_of_bread = <SliceOfBread label="page.device.commands.nav_title"/>;

    if (capabilities_tiles.type !== "data" || device_details.type !== "data") {
        return <>
            {slice_of_bread}
            <RemoteObjectPlaceholder object={[capabilities_tiles, device_details]}/>
        </>
    }

    if (capabilities_tiles.data.length === 0) {
        return <MissingPlaceholder label="page.device.commands.no_commands"/>
    }

    return <div>
        {slice_of_bread}

        {capabilities_tiles.data.map((capability_tile, i) => {

            return <div key={i}>
                <DeviceCapabilityTile
                    deviceId={props.deviceId}
                    capabilityName={capability_tile.capabilityName}/>
            </div>
        })}
    </div>
}
