import React from "react";
import SmileIcon from "mdi-material-ui/EmoticonSadOutline"
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import useTranslate from "../../i18n/useTranslate";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: theme.spacing(2),
        color: theme.palette.text.secondary
    },
    icon: {
        fontSize: 128,
    }
}))

export default function MissingPlaceholder<T>(props: {
    label: string
}) {
    const translate = useTranslate();
    const classes = useStyles();

    return <div className={classes.root}>
        <div>
            <SmileIcon className={classes.icon}/>
        </div>
        <Typography variant="h6">
            {translate(props.label)}
        </Typography>
    </div>
}
