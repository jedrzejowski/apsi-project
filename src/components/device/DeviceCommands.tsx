import React, {useState} from "react";
import MoodBadIcon from "@material-ui/icons/MoodBad";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {useCapabilitiesTiles} from "../../redux/reducers/capabilities_tiles";
import SliceOfBread from "../app/SliceOfBread";
import RemoteObjectPlaceholder from "../lib/RemoteObjectPlaceholder";
import useTranslate from "../../i18n/useTranslate";
import DeviceCommand from "./DeviceCommand";
import {useDeviceDetails} from "../../redux/reducers/device_details";
import {DataT} from "../../types";
import MissingPlaceholder from "../lib/MissingPlaceholder";

export default function DeviceCommands(props: {
    deviceId: string
}) {
    const translate = useTranslate();
    const capabilities_tiles = useCapabilitiesTiles(props.deviceId);
    const device_details = useDeviceDetails(props.deviceId);

    const slice_of_bread = <SliceOfBread label="page.device.commands.nav_title"/>;

    if (capabilities_tiles.type !== "data" || device_details.type !== "data") {
        return <>
            {slice_of_bread}
            <RemoteObjectPlaceholder object={capabilities_tiles}/>
        </>
    }

    if (capabilities_tiles.data.length === 0) {
        return <MissingPlaceholder label="page.device.commands.no_commands"/>
    }

    return <div>
        {slice_of_bread}

        {capabilities_tiles.data.map((capability_tile, i) => {

            return <DeviceCommandsSet key={i}
                                      deviceId={props.deviceId}
                                      component={device_details.data.components[i]}
                                      capabilityTile={capability_tile}/>
        })}
    </div>
}

function DeviceCommandsSet(props: {
    deviceId: string
    component: DataT.DeviceComponent
    capabilityTile: DataT.CapabilityTile
}) {
    const {
        capabilityTile: capability_tile,
        component
    } = props;
    const [open, setOpen] = useState(true);

    return <ExpansionPanel expanded={open}
                           onChange={event => setOpen(!open)}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
            <Typography>
                {component.label}
            </Typography>
        </ExpansionPanelSummary>

        <ExpansionPanelDetails>
            {capability_tile.attributes.map((attribute, i) => {
                const commands = capability_tile.commands.filter(command => attribute.possibleValues.includes(command.name));

                return <DeviceCommand key={i}
                                      deviceId={props.deviceId}
                                      component={component}
                                      attribute={attribute}
                                      commands={commands}/>
            })}
        </ExpansionPanelDetails>
    </ExpansionPanel>
}
