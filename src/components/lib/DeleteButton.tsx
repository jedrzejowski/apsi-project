import React, {useState} from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import makeStyles from "@material-ui/core/styles/makeStyles";
import RedColor from "@material-ui/core/colors/red";
import useTranslate from "../../hooks/useTranslate";

const useStyle = makeStyles(theme => ({
    delete_btn: {
        color: "white",
        backgroundColor: RedColor["500"],
        "&:hover": {
            backgroundColor: RedColor["700"],
        }
    }
}))

export default function DeleteButton(props: {
    confirmTitle?: string,
    confirmMessage: string,
    onConfirmDelete?: () => void,
    children: React.ReactNode
}) {
    const classes = useStyle();
    const translate = useTranslate();
    const [open, setOpen] = useState<boolean>(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    const handleDelete = () => {
        handleClose();
        props.onConfirmDelete?.();
    };

    return <>

        <Button classes={{
            root: classes.delete_btn
        }} onClick={handleClick}>
            {props.children}
        </Button>

        <Dialog
            open={open}
            onClose={handleClose}
        >
            {props.confirmTitle ? <DialogTitle>{props.confirmTitle}</DialogTitle> : undefined}
            {props.confirmMessage ? <DialogContent>
                <DialogContentText>
                    {translate(props.confirmMessage)}
                </DialogContentText>
            </DialogContent> : undefined}
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    {translate("component.delete_btn.dismiss")}
                </Button>
                <Button onClick={handleDelete} color="primary" autoFocus>
                    {translate("component.delete_btn.accept")}
                </Button>
            </DialogActions>
        </Dialog>
    </>
}