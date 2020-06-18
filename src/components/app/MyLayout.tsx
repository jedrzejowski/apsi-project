import React, {useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Navigation from "./MyNavigation";
import MenuIcon from '@material-ui/icons/Menu';
import {Drawer} from "@material-ui/core";
import useTheme from "@material-ui/core/styles/useTheme";
import Typography from "@material-ui/core/Typography";
import HomeIcon from '@material-ui/icons/Home';
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import AppBar from "@material-ui/core/AppBar";
import useTranslate from "../../i18n/useTranslate";
import Hidden from "@material-ui/core/Hidden";
import SliceOfBread, {Haversack} from "./SliceOfBread";
import Copyright from "../Copyright";
import Container from "@material-ui/core/Container";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
    },
    drawer: {
        [theme.breakpoints.up("sm")]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    appBarTitle: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up("sm")]: {
            display: "none",
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth
    },
    main: {
        display: "flex",
        flexGrow: 1,
        flexDirection: "column",
        minHeight: "100vh",
    },
    content: {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
    },
    closeMenuButton: {
        marginRight: "auto",
        marginLeft: 0,
    },
    footer: {
        padding: theme.spacing(3, 2),
        marginTop: "auto",
        backgroundColor:
            theme.palette.type === "light" ? theme.palette.grey[200] : theme.palette.grey[800],
    },
}));


export default function MyLayout(props: {
    children: React.ReactNode
}) {
    const classes = useStyles();
    const theme = useTheme();
    const translate = useTranslate();
    const [mobileOpen, setMobileOpen] = useState(false);

    function handleDrawerToggle() {
        setMobileOpen(!mobileOpen)
    }

    const drawer = (
        <div>
            <Navigation/>
        </div>
    );

    return (
        <div className={classes.root}>

            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="Open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon/>
                    </IconButton>

                    <Typography variant="h6" className={classes.appBarTitle}>
                        {translate("app.name")}
                    </Typography>

                </Toolbar>
            </AppBar>

            <nav className={classes.drawer}>
                <Hidden smUp implementation="css">
                    <Drawer
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        <IconButton onClick={handleDrawerToggle} className={classes.closeMenuButton}>
                            <CloseIcon/>
                        </IconButton>
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        className={classes.drawer}
                        variant="permanent"
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    >
                        <div className={classes.toolbar}/>
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>

            <div className={classes.main}>
                <div className={classes.toolbar}/>

                <Container>
                    <Haversack/>
                </Container>

                <SliceOfBread to="/" icon={HomeIcon}/>

                <main className={classes.content}>
                    {props.children}
                </main>

                <footer className={classes.footer}>
                    <Copyright/>
                </footer>

            </div>

        </div>
    );
}