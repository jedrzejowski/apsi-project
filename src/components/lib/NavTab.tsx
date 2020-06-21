import React from "react";
import Tabs from "@material-ui/core/Tabs";
import {useHistory, useRouteMatch} from "react-router-dom";
import Tab from "@material-ui/core/Tab";
import useTranslate from "../../i18n/useTranslate";

interface TabDef {
    label: string
    to: string
}

export default function NavTab(props: {
    tabs: TabDef[]
}) {
    const history = useHistory();
    const match = useRouteMatch(props.tabs.map(td => td.to));
    const translate = useTranslate();

    function handleChange(event: React.ChangeEvent<{}>, new_value: string) {
        history.push(new_value);
    }

    return (
        <Tabs
            onChange={handleChange}
            value={match?.path ?? props.tabs[0].to}
        >
            {props.tabs.map(tab_def => {
                return <Tab
                    key={tab_def.to}
                    value={tab_def.to}
                    label={translate(tab_def.label)}
                />
            })}

        </Tabs>
    )
}
