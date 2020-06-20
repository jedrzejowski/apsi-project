import React from "react";
import LanguageButton from "../../i18n/LanguageSwitch";
import TranslateIcon from "@material-ui/icons/Translate";
import Copyright from "../Copyright";
import Typography from "@material-ui/core/Typography";

export default function MyFooter() {
    return <>
        <LanguageButton type="button"/>
        <Copyright/>
    </>
}