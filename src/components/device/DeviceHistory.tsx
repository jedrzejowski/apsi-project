import React from "react";
import SliceOfBread from "../app/SliceOfBread";
import RemoteObjectPlaceholder from "../lib/RemoteObjectPlaceholder";
import HistoryTable from "../HistoryTable";
import {useDeviceHistory} from "../../redux/reducers/device_history";

export default function DeviceHistory(props: {
    deviceId: string
}) {
    const device_history = useDeviceHistory(props.deviceId);

    const slice_of_bread = <SliceOfBread label="page.device.history.nav_title"/>;

    if (device_history.type !== "data") {
        return <>
            {slice_of_bread}
            <RemoteObjectPlaceholder object={device_history}/>
        </>
    }

    return (
        <HistoryTable history={device_history.data}/>
    );
}