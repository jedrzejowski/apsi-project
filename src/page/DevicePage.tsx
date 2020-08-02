import React from "react";
import {useParams, useRouteMatch} from "react-router-dom";
import DeviceDetails from "../components/device/DeviceDetails";
import SliceOfBread from "../components/app/SliceOfBread";
import Container from "@material-ui/core/Container";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import {Route} from "react-router-dom";
import makeStyles from "@material-ui/core/styles/makeStyles";
import NavTab from "../components/lib/NavTab";
import {useDeviceDetails} from "../redux/reducers/device_details";
import RemoteObjectPlaceholder from "../components/lib/RemoteObjectPlaceholder";
import DeviceCommands from "../components/device/DeviceCommands";
import DeviceHistory from "../components/device/DeviceHistory";

const useStyles = makeStyles(theme => ({
    content_root: {
        paddingTop: theme.spacing(2)
    }
}))

export default function DevicePage(props: {}) {
    const match = useRouteMatch();
    const params = useParams<{ deviceId: string }>();
    const classes = useStyles();
    const device_details = useDeviceDetails(params.deviceId);

    if (device_details.type !== "data") {
        return <>
            <SliceOfBread label="Device"/>
            <RemoteObjectPlaceholder object={device_details}/>
        </>
    }

    return <>
        <SliceOfBread label="Device"/>
        <SliceOfBread label={device_details.data.name}/>

        <Container>
            <Toolbar>
                <Typography variant="h6" gutterBottom>
                    {device_details.data.name}
                </Typography>
            </Toolbar>
            <Paper>
                <NavTab tabs={[
                    // {to: `${match.url}/details`, label: "page.device.details.nav_title"},
                    {to: `${match.url}/commands`, label: "page.device.commands.nav_title"},
                    {to: `${match.url}/history`, label: "page.device.history.nav_title"}
                ]}/>
            </Paper>
        </Container>

        <Container className={classes.content_root}>
            {/*<Route exact path={`${match.url}/details`} render={() => <DeviceDetails deviceId={params.deviceId}/>}/>*/}
            <Route exact path={`${match.url}/commands`} render={() => <DeviceCommands deviceId={params.deviceId}/>}/>
            <Route exact path={`${match.url}/history`} render={() => <DeviceHistory deviceId={params.deviceId}/>}/>
            <Route exact path={`${match.url}/`} render={() => <DeviceCommands deviceId={params.deviceId}/>}/>
        </Container>

    </>
}
