import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import CircularProgress from "@material-ui/core/CircularProgress";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import DeleteButton from "../lib/DeleteButton";
import useTranslate from "../../hooks/useTranslate";
import {useDeviceDetails} from "../../redux/reducers/device_details";
import {nbsp} from "../../const";
import SliceOfBread from "../SliceOfBread";

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
        return <CircularProgress/>
    }

    return <div>
        <SliceOfBread label={device_details?.name ?? ""}/>

        <Toolbar className={classes.device_name}>
            <Typography variant="h6" gutterBottom className={classes.device_name}>
                {device_details?.name ?? ""}
            </Typography>
            <DeleteButton confirmMessage={"page.device.delete_btn.confirm"}>
                {translate("page.device.delete_btn.primary")}
            </DeleteButton>
        </Toolbar>

        {JSON.stringify(device_details, null, 4)
            .replace(/ /g, nbsp)
            .split(/\n/g).map((line, i) => {
                return <div key={i}>{line}</div>
            })}
    </div>
}