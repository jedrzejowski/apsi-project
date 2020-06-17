import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import AppDataProvider from "./redux/AppDataProvider";
import CssBaseline from '@material-ui/core/CssBaseline';
import NotificationContainer from "./components/NotificationContainer";
import TranslateProvider from "./i18n/TranslateProvider";
import {CookiesProvider} from "react-cookie";
import {HashRouter as Router} from "react-router-dom";
import {HaversackProvider} from "./components/SliceOfBread";

const app = document.createElement("div");
app.id = "app";
document.body.append(app);

ReactDOM.render(
    <CookiesProvider>
        <Router>
            <AppDataProvider>
                <TranslateProvider>
                    <HaversackProvider>
                        <CssBaseline/>
                        <App/>
                        <NotificationContainer/>
                    </HaversackProvider>
                </TranslateProvider>
            </AppDataProvider>
        </Router>
    </CookiesProvider>,
    app);
