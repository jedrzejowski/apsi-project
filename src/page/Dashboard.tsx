import React from "react";
import SliceOfBread from "../components/SliceOfBread";
import useTranslate from "../hooks/useTranslate";

export default function Dashboard() {
    const translate = useTranslate();

    return <>
        <SliceOfBread label={translate("page.dashboard.nav_title")}/>

        Dashboard
    </>
}