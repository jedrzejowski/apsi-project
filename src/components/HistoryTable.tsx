import React from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import type {DataT} from "../types";
import MissingPlaceholder from "./lib/MissingPlaceholder";
import useTranslate from "../i18n/useTranslate";

export default function HistoryTable(props: {
    history: DataT.HistoryEntry[]
}) {
    const translate = useTranslate();
    const {history} = props;

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>{translate("component.history_table.table_header.device")}</TableCell>
                        <TableCell>{translate("component.history_table.table_header.command")}</TableCell>
                        <TableCell>{translate("component.history_table.table_header.user")}</TableCell>
                        <TableCell>{translate("component.history_table.table_header.timestamp")}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {history.map((history_entry, i) => {

                        return (
                            <TableRow key={i}>
                                <TableCell>{history_entry.device}</TableCell>
                                <TableCell>{history_entry.command}</TableCell>
                                <TableCell>{history_entry.user}</TableCell>
                                <TableCell>{translate.timestampToString(history_entry.timestamp)}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>

            {history.length === 0 ? <MissingPlaceholder label="component.history_table.no_entries"/> : null}

        </TableContainer>
    );
}