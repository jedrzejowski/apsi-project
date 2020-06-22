import React from "react";
import Box from "@material-ui/core/Box";
import {useCapabilitiesTiles} from "../../redux/reducers/capabilities_tiles";
import SliceOfBread from "../app/SliceOfBread";
import RemoteObjectPlaceholder from "../lib/RemoteObjectPlaceholder";
import DeviceCapabilityTile from "./DeviceCapabilityTile";
import MissingPlaceholder from "../lib/MissingPlaceholder";
import {useDeviceShort} from "../../redux/reducers/device_list";
import Button from "@material-ui/core/Button";
import useTranslate from "../../i18n/useTranslate";
import useAppDispatch from "../../hooks/useAppDispatch";

export default function DeviceCommands(props: {
    deviceId: string
}) {
    const translate = useTranslate();
    const dispatch = useAppDispatch();
    const capabilities_tiles = useCapabilitiesTiles(props.deviceId);
    const device_short = useDeviceShort(props.deviceId);

    function handleAddToApp() {
        dispatch("DEVICE_ADD_TO_APP_REQUEST", props.deviceId);
    }

    const slice_of_bread = <SliceOfBread label="page.device.commands.nav_title"/>;

    if (capabilities_tiles.type !== "data" || device_short.type !== "data") {
        return <>
            {slice_of_bread}
            <RemoteObjectPlaceholder object={[capabilities_tiles, device_short]}/>
        </>
    }

    if (!device_short.data.presentInApp) {
        return <Box display="flex" flexDirection="column">
            <Button>
                {translate("page.device.command.add_to_app")}
            </Button>
        </Box>
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
