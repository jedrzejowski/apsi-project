import React from "react";
import SliceOfBread from "../components/app/SliceOfBread";
import useTranslate from "../i18n/useTranslate";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import {useUserData} from "../redux/reducers/user_data";
import Typography from "@material-ui/core/Typography";
import UserDataTable from "../components/user/UserDataTable";
import UserHistory from "../components/user/UserHistory";

export default function MyHistory() {
    const user_data = useUserData();

    if (user_data?.type !== "data") {
        throw new Error()
    }

    return (
        <Container>
            <SliceOfBread label="page.myhistory.nav_title"/>
            <UserHistory username={user_data.data.username}/>
        </Container>
    )
}
