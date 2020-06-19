import React from "react";
import SliceOfBread from "../components/app/SliceOfBread";
import useTranslate from "../i18n/useTranslate";

export default function Dashboard() {
    const translate = useTranslate();

    return <>
        <SliceOfBread label={translate("page.dashboard.nav_title")}/>

        Dashboard
    </>
}