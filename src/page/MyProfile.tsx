import React from "react";
import SliceOfBread from "../components/SliceOfBread";
import useTranslate from "../hooks/useTranslate";

export default function MyProfile() {
    const translate = useTranslate();

    return (
        <div>
            <SliceOfBread label={translate("page.my_profle.nav_title")}/>
            MyProfile
        </div>
    )
}
