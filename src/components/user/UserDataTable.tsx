import React, {useMemo, useState} from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Toolbar from "@material-ui/core/Toolbar";
import {useIsUserDataUpdating, useUserData} from "../../redux/reducers/user_data";
import useTranslate from "../../i18n/useTranslate";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import useAppDispatch from "../../hooks/useAppDispatch";
import LoadingDialog from "../lib/LoadingDialog";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    toolbar: {
        padding: 0
    },
    expander: {
        flexGrow: 1
    }
}), {name: "UserDataTable"});

export default function UserDataTable() {
    const classes = useStyles();
    const translate = useTranslate();
    const user_data = useUserData();
    const dispatch = useAppDispatch();
    const is_loading = useIsUserDataUpdating();
    const [editing, setEditing] = useState(false);

    if (user_data?.type !== "data") {
        throw new Error()
    }

    const [first_name, setFirstName] = useState(user_data.data.first_name);
    const [last_name, setLastName] = useState(user_data.data.last_name);
    const [authorization_token, setAuthorizationToken] = useState(user_data.data.authorization_token);
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");

    function handleStartEditing() {
        setEditing(true);
    }

    function handleSaveChanges() {
        setEditing(false);

        if (user_data?.type !== "data") {
            throw new Error()
        }

        dispatch("USER_DATA_UPDATE", {
            ...user_data.data,
            first_name,
            last_name,
            authorization_token
        });
    }

    function handleCancelEditing() {
        setEditing(false);

        if (user_data?.type !== "data") {
            throw new Error()
        }

        setFirstName(user_data.data.first_name);
        setLastName(user_data.data.last_name);
        setAuthorizationToken(user_data.data.authorization_token);
    }

    return <div>

        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="left">{translate("page.myprofile.name_of_field")}</TableCell>
                        <TableCell align="right">{translate("page.myprofile.value_of_field")}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <EditableValue
                        name="page.myprofile.first_name"
                        value={first_name} onChange={setFirstName} edit={editing}/>
                    <EditableValue
                        name="page.myprofile.last_name"
                        value={last_name} onChange={setLastName} edit={editing}/>
                    <EditableValue
                        name="page.myprofile.authorization_token"
                        value={authorization_token} onChange={setAuthorizationToken} edit={editing}/>
                </TableBody>
            </Table>
        </TableContainer>

        <Toolbar classes={{root: classes.toolbar}}>

            {editing ? <Button variant="contained" color="secondary" onClick={handleCancelEditing}>
                {translate("page.myprofile.cancel_edit")}
            </Button> : null}

            <div className={classes.expander}/>

            {!editing ? <Button variant="contained" color="primary" onClick={handleStartEditing}>
                {translate("page.myprofile.start_edit")}
            </Button> : null}

            {editing ? <Button variant="contained" color="primary" onClick={handleSaveChanges}>
                {translate("page.myprofile.save_changes")}
            </Button> : null}

        </Toolbar>

        <LoadingDialog loading={is_loading}/>
    </div>
}

function EditableValue(props: {
    name: string
    edit?: boolean
    value: string
    onChange: (new_value: string) => void
}) {
    const translate = useTranslate();

    return (
        <TableRow>
            <TableCell align="left" component="th">
                <Typography noWrap>
                    {translate(props.name)}
                </Typography>
            </TableCell>
            <TableCell align="right">
                {props.edit ? (
                    <TextField value={props.value} fullWidth
                               onChange={event => props.onChange(event.target.value)}/>
                ) : (
                    <Typography>
                        {props.value}
                    </Typography>
                )}
            </TableCell>
        </TableRow>
    )
}