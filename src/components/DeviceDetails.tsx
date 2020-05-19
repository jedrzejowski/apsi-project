import React from "react";
import {useParams} from "react-router-dom";
import {useDeviceDetails} from "../redux/reducers/device_details";
import {nbsp} from "../const";
import Toolbar from "@material-ui/core/Toolbar";
import CircularProgress from "@material-ui/core/CircularProgress";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import useTranslate from "../hooks/useTranslate";
import Typography from "@material-ui/core/Typography";
import RedColor from "@material-ui/core/colors/red";
import DeleteButton from "./lib/DeleteButton";

const useStyle = makeStyles(theme => ({
    device_name: {
        flexGrow: 1
    }
}))

export default function DeviceDetails(props: {}) {
    const classes = useStyle();
    const translate = useTranslate();
    const device_id = useParams<any>().deviceId;

    const device_details = useDeviceDetails(device_id);

    if (!device_details) {
        return <CircularProgress/>
    }

    return <div>
        <Toolbar className={classes.device_name}>
            <Typography variant="h6" gutterBottom className={classes.device_name}>
                {device_details?.name ?? ""}
            </Typography>
            <DeleteButton confirmMessage={"page.device.delete_btn.confirm"}>
                {translate("page.device.delete_btn.label")}
            </DeleteButton>
        </Toolbar>

        {JSON.stringify(device_details, null, 4)
            .replace(/ /g, nbsp)
            .split(/\n/g).map((line, i) => {
                return <div key={i}>{line}</div>
            })}
    </div>
}