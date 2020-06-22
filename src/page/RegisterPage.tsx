import React, {UIEvent, useState} from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Container from "@material-ui/core/Container";
import Copyright from "../components/Copyright";
import LanguageSwitch from "../i18n/LanguageSwitch";
import useTranslate from "../i18n/useTranslate";
import AppLink from "../components/lib/AppLink";
import useAppDispatch from "../hooks/useAppDispatch";
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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}), {name: "RegisterPage"});

export default function RegisterPage() {
    const classes = useStyles();
    const translate = useTranslate();
    const dispatch = useAppDispatch();

    const user_data = useUserData();

    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [authorization_token, setAuthorizationToken] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");

    function handleSubmit(event: any) {
        event.preventDefault();

        if (password1 !== password2) {
            dispatch("NOTIFICATION_ADD", {
                content: "notification_msg.registration.password_mismatch",
                level: "error"
            })
            return;
        }

        dispatch("USER_REGISTER", {
            username,
            authorization_token,
            last_name,
            first_name,
            password: password1
        })
    }

    return (<>
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    {translate("page.register.sign_up_invite")}
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                variant="outlined"
                                required
                                fullWidth
                                label={translate("page.register.first_name_label")}
                                autoFocus
                                value={first_name}
                                onChange={event => setFirstName(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                label={translate("page.register.last_name_label")}
                                autoComplete="lname"
                                value={last_name}
                                onChange={event => setLastName(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                label={translate("page.register.username_label")}
                                autoComplete="username"
                                value={username}
                                onChange={event => setUsername(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                label={translate("page.register.password_label")}
                                type="password"
                                autoComplete="current-password"
                                value={password1}
                                onChange={event => setPassword1(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                label={translate("page.register.password_label")}
                                type="password"
                                autoComplete="current-password"
                                value={password2}
                                onChange={event => setPassword2(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                label={translate("page.register.token_label")}
                                value={authorization_token}
                                onChange={event => setAuthorizationToken(event.target.value)}
                            />
                        </Grid>

                    </Grid>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}
                    >
                        {translate("page.register.submit")}
                    </Button>

                    <Grid container justify="flex-end">
                        <Grid item>
                            <AppLink to="/login">
                                {translate("page.register.sign_in")}
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
    </>);
}