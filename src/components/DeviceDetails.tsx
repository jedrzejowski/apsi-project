import React from "react";
import {useParams} from "react-router-dom";
import {useDeviceDetails} from "../redux/reducers/device_details";
import {nbsp} from "../const";

export default function DeviceDetails(props: {}) {
    const device_id = useParams<any>().deviceId;

    const device_details = useDeviceDetails(device_id);


    return <div>
        {JSON.stringify(device_details, null, 4)
            .replace(/ /g, nbsp)
            .split(/\n/g).map(line => {
                return <>{line}<br/></>
            })}
    </div>
}