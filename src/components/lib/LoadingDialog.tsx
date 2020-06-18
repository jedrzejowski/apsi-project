import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import useTranslate from "../../i18n/useTranslate";

export default function (props: {
    loading: boolean
}) {
    const translate = useTranslate();

    return <Dialog
        open={props.loading}
    >
        <DialogContent>
            <DialogContentText>
                {translate("loading")}
            </DialogContentText>
        </DialogContent>
    </Dialog>
}