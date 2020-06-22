import React from "react";
import Typography from "@material-ui/core/Typography";
import RemoteObjectPlaceholder from "../lib/RemoteObjectPlaceholder";
import HistoryTable from "../HistoryTable";
import {useUserHistory} from "../../redux/reducers/user_history";
import useTranslate from "../../i18n/useTranslate";
import Toolbar from "@material-ui/core/Toolbar";

export default function UserHistory(props: {
    username: string
}) {
    const translate = useTranslate();
    const user_history = useUserHistory(props.username);

    if (user_history.type !== "data") {
        return <RemoteObjectPlaceholder object={user_history}/>;
    }

    return <div>
        <Toolbar>
            <Typography variant="h6">
                {translate("component.history_table.user_title")}
            </Typography>
        </Toolbar>
        <HistoryTable history={user_history.data}/>
    </div>;
}