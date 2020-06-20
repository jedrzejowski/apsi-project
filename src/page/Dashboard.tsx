import React from "react";
import SliceOfBread from "../components/app/SliceOfBread";
import useTranslate from "../i18n/useTranslate";
import Container from "@material-ui/core/Container";
import DeviceDashboardItem from "../components/device/DeviceDashboardItem";
import ColumnLayout from "../components/lib/ColumnLayout";
import useTheme from "@material-ui/core/styles/useTheme";
import useMediaQuery from "@material-ui/core/useMediaQuery";


export default function Dashboard() {
    const theme = useTheme();
    const translate = useTranslate();

    const is_mobile = useMediaQuery(theme.breakpoints.down("xs"));
    const is_medium = useMediaQuery(theme.breakpoints.down("md"));

    let columns = 3, spacing = 4;
    if (is_medium) {
        columns = 2;
        spacing = 3;
    }
    if (is_mobile) {
        columns = 1;
        spacing = 2;
    }

    return <>
        <SliceOfBread label={translate("page.dashboard.nav_title")}/>


        <Container>
            <ColumnLayout
                columns={columns}
                hSpacing={theme.spacing(spacing - 1)}
                vSpacing={theme.spacing(spacing)}
            >

                <DeviceDashboardItem/>
                <DeviceDashboardItem/>
                <DeviceDashboardItem/>

                <DeviceDashboardItem/>
                <DeviceDashboardItem/>
                <DeviceDashboardItem/>

                <DeviceDashboardItem/>
                <DeviceDashboardItem/>
                <DeviceDashboardItem/>

            </ColumnLayout>
        </Container>
    </>
}