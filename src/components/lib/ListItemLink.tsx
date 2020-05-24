// https://material-ui.com/guides/composition/#link

import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {Link as RouterLink, LinkProps as RouterLinkProps} from 'react-router-dom';
import {Omit} from '@material-ui/types';

export default function ListItemLink(props: {
    children: React.ReactNode;
    to: string;
}) {
    const {children, to} = props;

    const renderLink = React.useMemo(
        () =>
            React.forwardRef<any, Omit<RouterLinkProps, 'to'>>((itemProps, ref) => (
                <RouterLink to={to} ref={ref} {...itemProps} />
            )),
        [to],
    );

    return (
        <ListItem button component={renderLink}>
            {children}
        </ListItem>
    );
}