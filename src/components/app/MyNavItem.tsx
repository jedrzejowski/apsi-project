import React from "react";
import useTranslate from "../../i18n/useTranslate";
import {useRouteMatch} from "react-router-dom";
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
    onClick?: React.MouseEventHandler
}) {
    const theme = useTheme();
    const translate = useTranslate();
    const match = useRouteMatch(props.to ?? "");

    const primary = typeof props.primary === "string" ? translate(props.primary) : props.primary;

    return (
        <AppLink to={props.to ?? "#"} color="inherit">
            <ListItem
                onClick={props.onClick}
                selected={match?.path === props.to}
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
