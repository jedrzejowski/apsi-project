import React, {useState} from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Container from "@material-ui/core/Container";
import useTranslate from "../i18n/useTranslate";
import useAppDispatch from "../hooks/useAppDispatch";
import Copyright from "../components/Copyright";
import LanguageSwitch from "../i18n/LanguageSwitch";
import AppLink from "../components/lib/AppLink";
import {useUserData} from "../redux/reducers/user_data";
import LoadingDialog from "../components/lib/LoadingDialog";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%",
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    }
}), {name: "LoginPage"});

export default function LoginPage() {
    const classes = useStyles();
    const translate = useTranslate();

    const dispatch = useAppDispatch();
    const user_data = useUserData();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(event: React.MouseEvent) {
        event.preventDefault();
        dispatch("USER_LOGIN", {username, password});
    }

    return <>
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    {translate("page.login.sign_invite")}
                </Typography>
                <form className={classes.form} noValidate>

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label={translate("page.login.username_label")}
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={e => setUsername(e.target.value)}
                        error={user_data?.type === "error"}
                    />

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label={translate("page.login.password_label")}
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={e => setPassword(e.target.value)}
                        error={user_data?.type === "error"}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}
                    >
                        {translate("page.login.submit")}
                    </Button>

                    <Grid container>
                        <Grid item xs>
                            <AppLink to="/forgot_password">
                                {translate("page.login.forgot_password")}
                            </AppLink>
                        </Grid>
                        <Grid item>
                            <AppLink to="/register">
                                {translate("page.login.sign_up")}
                            </AppLink>
                        </Grid>
                    </Grid>

                </form>
            </div>

            <Box mt={4}>
                <Typography variant="body2" color="textSecondary" align="center">
                    <LanguageSwitch type="text"/>
                </Typography>
            </Box>

            <Box mt={4} mb={8}>
                <Copyright/>
            </Box>

        </Container>

        <LoadingDialog loading={user_data?.type === "loading"}/>
    </>
}