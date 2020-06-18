import React from "react";
import useTranslate from "../../i18n/useTranslate";
import {useLocation} from "react-router-dom";
import AppLink from "../lib/AppLink";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import useTheme from "@material-ui/core/styles/useTheme";

export default function NavItem(props: {
    to?: string
    depth?: number
    primary: React.ReactElement | string
    icon?: React.ReactElement
}) {
    const theme = useTheme();
    const translate = useTranslate();
    const location = useLocation();

    const primary = typeof props.primary === "string" ? translate(props.primary) : props.primary;

    return (
        <AppLink to={props.to ?? "#"} color="inherit">
            <ListItem
                selected={location.pathname === props.to}
                style={{
                    paddingLeft: theme.spacing(((props.depth ?? 0) + 1) * 2)
                }}>

                <ListItemIcon>
                    {props.icon ? props.icon : <></>}
                </ListItemIcon>
                <ListItemText primary={primary}/>

            </ListItem>
        </AppLink>
    );
}
