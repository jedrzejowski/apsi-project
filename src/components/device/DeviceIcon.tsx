import React from "react";
import {useDeviceDetails} from "../../redux/reducers/device_details";
import DeviceUnknownIcon from "@material-ui/icons/DeviceUnknown";
import ToggleOnIcon from '@material-ui/icons/ToggleOn';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import FireplaceTwoToneIcon from '@material-ui/icons/FireplaceTwoTone';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import HomeThermometerOutlineIcon from "mdi-material-ui/HomeThermometerOutline";

export default function DeviceIcon(props: {
    deviceId: string
}) {
    const device = useDeviceDetails(props.deviceId);

    switch (device?.deviceTypeName) {
        case "Simulated Switch":
            return <ToggleOnIcon/>
        case "Simulated Temperature Sensor":
            return <HomeThermometerOutlineIcon/>
        case "Simulated Button":
            return <RadioButtonUncheckedIcon/>;
        case "Simulated Smoke Alarm":
            return <FireplaceTwoToneIcon/>
        case "Simulated Motion Sensor":
            return <DirectionsRunIcon/>
        default:
            return <DeviceUnknownIcon/>
    }
}