import React from "react";
import Typography from "@material-ui/core/Typography";
import RemoteObjectPlaceholder from "../lib/RemoteObjectPlaceholder";
import HistoryTable from "../HistoryTable";
import {useUserHistory} from "../../redux/reducers/user_history";

export default function UserHistory(props: {
    username: string
}) {
    const user_history = useUserHistory(props.username);

    if (user_history.type !== "data") {
        return <RemoteObjectPlaceholder object={user_history}/>;
    }

    return <div>
        <Typography>
            TODO: Dodać tytuł
        </Typography>
        <HistoryTable history={user_history.data}/>
    </div>;
}