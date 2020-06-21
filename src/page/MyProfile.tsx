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

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    leftPanel: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "& *+*": {
            marginTop: theme.spacing(1)
        }
    },
    avatar: {
        marginBottom: theme.spacing(2),
        width: 128,
        height: 128
    }
}));

const avatar_src = "https://i2.wp.com/www.killthecan.org/wp-content/uploads/2017/06/Leonidas-avatar.jpg?ssl=1";

export default function MyProfile() {
    const classes = useStyles();
    const translate = useTranslate();
    const credentials = useUserData();

    if (credentials?.type !== "data") {
        throw new Error()
    }

    return (
        <div>
            <SliceOfBread label={translate("page.myprofile.nav_title")}/>

            <Container maxWidth="md">
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <div className={classes.leftPanel}>

                            <Avatar src={avatar_src} className={classes.avatar}/>

                            <Typography variant="h5" noWrap>
                                {credentials.data.first_name}
                            </Typography>

                            <Typography variant="h6" noWrap>
                                {credentials.data.last_name}
                            </Typography>

                        </div>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <UserDataTable/>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}
