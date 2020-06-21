import React from "react";
import {RemoteObject} from "../../types";
import makeStyles from "@material-ui/core/styles/makeStyles";
import MoodBadIcon from "@material-ui/icons/MoodBad";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import useTheme from "@material-ui/core/styles/useTheme";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: theme.spacing(2)
    }
}))

export default function RemoteObjectPlaceholder(props: {
    object: RemoteObject<any, any> | RemoteObject<any, any>[]
    variant?: "layout" | "text"
}) {
    const classes = useStyles();
    const theme = useTheme();

    const objects = Array.isArray(props.object) ? props.object : [props.object];

    const is_layout = props.variant === undefined || props.variant === "layout";
    const is_text = props.variant === "text";

    if (objects.find(object => object.type === "error")) {

        if (is_layout) {
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

        if (is_text) {
            return <>
                <CircularProgress size="0.8em"/>
                <span>error</span>
            </>
        }
    }

    if (objects.find(object => object.type === "loading")) {

        if (is_layout) {
            return (
                <div className={classes.root}>
                    <div>
                        <CircularProgress/>
                    </div>
                </div>
            )
        }

        if (is_text) {
            return (<CircularProgress size="0.8em"/>);
        }
    }


    throw new Error();
}
