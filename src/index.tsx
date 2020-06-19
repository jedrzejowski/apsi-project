import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import {HashRouter as Router} from "react-router-dom";

import App from "./App";
import AppDataProvider from "./redux/AppDataProvider";
import NotificationContainer from "./components/NotificationContainer";
import TranslateProvider from "./i18n/TranslateProvider";
import {HaversackProvider} from "./components/app/SliceOfBread";
import {TitleProvider} from "./components/app/Title";
import MyThemeProvider from "./components/app/MyThemeProvider";

const app = document.createElement("div");
app.id = "app";
document.body.append(app);

ReactDOM.render(
    <Router>
        <AppDataProvider>
            <TranslateProvider>
                <MyThemeProvider>
                    <HaversackProvider>
                        <TitleProvider>
                            <CssBaseline/>
                            <App/>
                            <NotificationContainer/>
                        </TitleProvider>
                    </HaversackProvider>
                </MyThemeProvider>
            </TranslateProvider>
        </AppDataProvider>
    </Router>,
    app);
