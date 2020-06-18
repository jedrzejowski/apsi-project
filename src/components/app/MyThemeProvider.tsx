import React, {useState} from "react";
import {Helmet} from "react-helmet";
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";

const default_theme = createMuiTheme({});


export default function MyThemeProvider(props: {
    browserColor?: boolean
    children: React.ReactNode
}) {
    const [theme, setTheme] = useState(default_theme);

    return (
        <ThemeProvider theme={theme}>
            <Helmet>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
                <link rel="stylesheet"
                      href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
                <meta name="theme-color" content={theme.palette.primary.main}/>
            </Helmet>

            {props.children}
        </ThemeProvider>
    );
}