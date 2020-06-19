import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import useTranslate from "../../i18n/useTranslate";

export default function LoadingDialog(props: {
    label?: string
    loading: boolean
}) {
    const translate = useTranslate();

    return <Dialog
        open={props.loading}
    >
        <DialogContent>
            <DialogContentText>
                {translate(props.label ?? "loading")}
            </DialogContentText>
        </DialogContent>
    </Dialog>
}