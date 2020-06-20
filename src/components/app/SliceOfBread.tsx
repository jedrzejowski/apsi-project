import React, {useContext, useEffect, useReducer, useState} from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import noop from "../../lib/noop";
import AppLink from "../lib/AppLink";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import {Variant as TypographyVariant} from "@material-ui/core/styles/createTypography";
import useTranslate from "../../i18n/useTranslate";

interface SliceOfBreadProps<Icon extends React.ElementType = any> {
    icon?: Icon
    to?: string
    label?: string
}

const default_stack: SliceOfBreadProps[] = [];

const HaversackContext = React.createContext<{
    stack: SliceOfBreadProps[]
    pop: () => void
    push: (props: SliceOfBreadProps) => void
}>({stack: default_stack, pop: noop, push: noop});


function haversackReducer(stack: SliceOfBreadProps[], action: any) {
    switch (action.type) {
        case "pop":
            return stack.slice(0, -1);
        case "push":
            return [...stack, action.slice]
        default:
            return stack;
    }
}

export function HaversackProvider(props: {
    children: React.ReactNode
}) {
    const [stack, dispatch] = useReducer(haversackReducer, default_stack);

    return <HaversackContext.Provider value={{
        stack,
        pop() {
            //@ts-ignore
            dispatch({type: "pop"});
        },
        push(slice: SliceOfBreadProps) {
            //@ts-ignore
            dispatch({type: "push", slice});
        }
    }}>
        {props.children}
    </HaversackContext.Provider>
}

const useStyles = makeStyles((theme) => ({
    link: {
        display: "flex",
    },
    icon: {
        marginRight: theme.spacing(0.5),
        width: 20,
        height: 20,
    },
}));

export function Haversack(props: {
    variant?: TypographyVariant
}) {
    const classes = useStyles();
    const translate = useTranslate();
    const haversack = useContext(HaversackContext);

    return (
        <Breadcrumbs>
            {haversack.stack.map((slice, i) => {
                return <AppLink key={i} to={slice.to ?? "#"} color="inherit">
                    {slice.icon ? React.createElement(slice.icon, {className: classes.icon}) : null}
                    <Typography variant={props.variant} className={classes.link}>
                        {translate(slice.label ?? "")}
                    </Typography>
                </AppLink>
            })}
        </Breadcrumbs>
    );
}

function SliceOfBread(props: SliceOfBreadProps) {
    const haversack = useContext(HaversackContext);

    useEffect(() => {
        haversack.push(props);
        return () => haversack.pop();
    }, [])

    return null;
}

export default SliceOfBread;