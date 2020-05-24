import React from "react";
import DeviceUnknownIcon from "@material-ui/icons/DeviceUnknown";
import ToggleOnIcon from '@material-ui/icons/ToggleOn';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import FireplaceTwoToneIcon from '@material-ui/icons/FireplaceTwoTone';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import HomeThermometerOutlineIcon from "mdi-material-ui/HomeThermometerOutline";
import {useDeviceShort} from "../../redux/reducers/device_list";

// https://materialdesignicons.com/
// https://material-ui.com/components/material-icons/

export default function DeviceIcon(props: {
    deviceId: string
}) {
    const device = useDeviceShort(props.deviceId);

    switch (device?.dth.deviceTypeName) {
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