import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Copyright from "../components/Copyright";
import LanguageSwitch from "../components/LanguageSwitch";
import useTranslate from "../hooks/useTranslate";
import AppLink from "../components/lib/AppLink";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}), {name: "RegisterPage"});

export default function RegisterPage() {
    const classes = useStyles();
    const translate = useTranslate();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
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
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label={translate("page.register.first_name_label")}
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label={translate("page.register.last_name_label")}
                                name="lastName"
                                autoComplete="lname"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label={translate("page.register.email_label")}
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label={translate("page.register.password_label")}
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                        </Grid>

                    </Grid>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
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
    );
}