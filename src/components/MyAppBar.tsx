import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ChatIcon from '@material-ui/icons/Chat';
import {makeStyles} from "@material-ui/core/styles";
import useTranslate from "../hooks/useTranslate";
import LanguageButton from "./LanguageButton";
import {useLocation} from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    iconLeft: {
        marginRight: theme.spacing(2),
    },
    iconRight: {
        marginLeft: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}), {
    name: "MyAppBar"
});

export default function MyAppBar(props: {}) {
    const classes = useStyles();
    const translate = useTranslate();
    const location = useLocation();
    console.log(location);

    return <div>

        <Toolbar/>

        <AppBar position="fixed">
            <Toolbar>

                <ChatIcon className={classes.iconLeft}/>

                <Typography variant="h6" color="inherit" noWrap className={classes.title}>
                    {translate("app.name")}{location.pathname}
                </Typography>

                <LanguageButton/>

            </Toolbar>
        </AppBar>
    </div>
}
