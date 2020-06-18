import React, {useState} from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Toolbar from "@material-ui/core/Toolbar";
import {useCredentials} from "../../redux/reducers/credentials";
import useTranslate from "../../i18n/useTranslate";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

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
    const credentials = useCredentials();
    const [editing, setEditing] = useState(false);

    if (credentials?.type !== "data") {
        throw new Error()
    }

    const [first_name, setFirstName] = useState(credentials.data.first_name);
    const [last_name, setLastName] = useState(credentials.data.last_name);
    const [authorization_token, setAuthorizationToken] = useState(credentials.data.authorization_token);

    function handleStartEditing() {
        setEditing(true);
    }

    function handleSaveChanges() {

    }

    function handleCancelEditing() {
        setEditing(false);
        setFirstName(credentials.data.first_name);
        setLastName(credentials.data.last_name);
        setAuthorizationToken(credentials.data.authorization_token);
    }

    return <div>

        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="left">{translate("page.profile.name_of_field")}</TableCell>
                        <TableCell align="right">{translate("page.profile.value_of_field")}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <EditableValue
                        name="page.profile.first_name"
                        value={first_name} onChange={setFirstName} edit={editing}/>
                    <EditableValue
                        name="page.profile.last_name"
                        value={last_name} onChange={setLastName} edit={editing}/>
                    <EditableValue
                        name="page.profile.authorization_token"
                        value={authorization_token} onChange={setAuthorizationToken} edit={editing}/>
                </TableBody>
            </Table>
        </TableContainer>

        <Toolbar classes={{root: classes.toolbar}}>

            {editing ? <Button variant="contained" color="secondary" onClick={handleCancelEditing}>
                {translate("page.profile.cancel_edit")}
            </Button> : null}

            <div className={classes.expander}/>

            {!editing ? <Button variant="contained" color="primary" onClick={handleStartEditing}>
                {translate("page.profile.start_edit")}
            </Button> : null}

            {editing ? <Button variant="contained" color="primary" onClick={handleSaveChanges}>
                {translate("page.profile.save_changes")}
            </Button> : null}

        </Toolbar>

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
                {translate(props.name)}
            </TableCell>
            <TableCell align="right">
                {props.edit ?
                    <TextField value={props.value} fullWidth
                               onChange={event => props.onChange(event.target.value)}/>
                    : props.value}
            </TableCell>
        </TableRow>
    )
}