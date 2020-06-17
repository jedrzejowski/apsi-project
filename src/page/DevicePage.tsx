import React from "react";
import {useParams, useRouteMatch} from "react-router-dom";
import DeviceDetails from "../components/device/DeviceDetails";
import SliceOfBread from "../components/SliceOfBread";


export default function DevicePage(props: {}) {
    const params = useParams<{ deviceId: string }>();

    return <>
        <SliceOfBread label="Device"/>
        <DeviceDetails deviceId={params.deviceId}/>
    </>
}