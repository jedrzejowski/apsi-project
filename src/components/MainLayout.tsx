import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import MyAppBar from "./MyAppBar";
import Grid from "@material-ui/core/Grid";
import AppLeftMenu from "./AppLeftMenu";

import {
    MemoryRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexDirection: "column",
        height: "100vh",
    },
    main: {
        flex: 1
    }
}));


export default function MainLayout(props: {
    children: React.ReactNode
}) {
    const classes = useStyles();

    return <div className={classes.root}>

        <MyAppBar/>

        <main>

            <Grid container>

                <Grid item xs={3}>
                    <AppLeftMenu/>
                </Grid>

                <Grid item xs={9}>
                    {props.children}
                </Grid>

            </Grid>

        </main>

    </div>
}