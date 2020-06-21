import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import useTranslate from "../../i18n/useTranslate";
import {useDeviceDetails} from "../../redux/reducers/device_details";
import {nbsp} from "../../const";
import SliceOfBread from "../app/SliceOfBread";

const useStyle = makeStyles(theme => ({
    device_name: {
        flexGrow: 1
    }
}))

export default function DeviceDetails(props: {
    deviceId: string
}) {
    const classes = useStyle();
    const translate = useTranslate();

    const device_details = useDeviceDetails(props.deviceId);

    if (!device_details) {
        throw new Error();
    }

    return <div>
        <SliceOfBread label="page.device.details.nav_title"/>

        {JSON.stringify(device_details, null, 4)
            .replace(/ /g, nbsp)
            .split(/\n/g).map((line, i) => {
                return <div key={i}>{line}</div>
            })}
    </div>
}