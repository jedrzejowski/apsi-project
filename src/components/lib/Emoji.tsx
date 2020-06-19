import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";

const emoji_font = "apple color emoji,segoe ui emoji,noto color emoji,android emoji,emojisymbols,emojione mozilla,twemoji mozilla,segoe ui symbol;"

const useClasses = makeStyles({
    emoji: {
        fontFamily: emoji_font
    }
})

export default function (props: {
    children: React.ReactNode
}) {
    const classes = useClasses();

    return <span className={classes.emoji}>
        {props.children}
    </span>
}