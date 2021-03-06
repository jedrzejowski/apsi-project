import {Link as RouterLink} from "react-router-dom";
import Link from "@material-ui/core/Link";
import React from "react";

export default function (props: {
    children: React.ReactNode
    to: string
    color?: "initial" | "inherit" | "primary" | "secondary" | "textPrimary" | "textSecondary" | "error"
    onClick?: React.MouseEventHandler
}) {
    return <Link component={RouterLink}
                 to={props.to}
                 underline="none"
                 color={props.color}
                 onClick={props.onClick}>
        {props.children}
    </Link>
}