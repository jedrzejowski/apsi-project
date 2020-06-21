import React from "react";
import {RemoteObject} from "../../types";
import makeStyles from "@material-ui/core/styles/makeStyles";
import MoodBadIcon from "@material-ui/icons/MoodBad";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: theme.spacing(2)
    }
}))

export default function RemoteObjectPlaceholder<T>(props: {
    object: RemoteObject<T>
}) {
    const classes = useStyles();

    if (props.object.type === "loading") {
        return (
            <div className={classes.root}>
                <div>
                    <CircularProgress/>
                </div>
            </div>
        )
    }

    if (props.object.type === "error") {
        return (
            <div className={classes.root}>
                <div>
                    <MoodBadIcon/>
                </div>
                <Typography variant="h6">
                    error
                </Typography>
            </div>
        )
    }

    throw new Error();
}
