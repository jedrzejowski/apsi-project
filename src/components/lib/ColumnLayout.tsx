import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap"
    },
    column: {
        flexGrow: 1,
        flexBasis: 0
    },
    columnSpacing: {
        flexShrink: 0
    },
    cell: {},
    cellSpacing: {}
}, {name: "ColumnLayout"});

interface ColumnLayoutProps {
    children: React.ReactNode
    columns: number
    vSpacing?: number
    hSpacing?: number
}

type ColumnLayoutPropsWithStyles = ColumnLayoutProps & {
    classes: ReturnType<typeof useStyles>
}

interface ColumnLayoutState {
}

class ColumnLayout extends React.Component<ColumnLayoutPropsWithStyles, ColumnLayoutState> {
    children_ref: {
        height: number
        react_ref: React.RefObject<HTMLDivElement>
    }[] = [];

    constructor(props: Readonly<ColumnLayoutPropsWithStyles>) {
        super(props);

        this.state = {
            childRef: []
        }
    }

    componentDidMount() {
        this.forceUpdate();
    }

    trimChildrenRef() {
        const children_count = React.Children.count(this.props.children);

        // przycięcie tablicy refów
        if (children_count !== this.children_ref.length) {
            if (children_count > this.children_ref.length) {

                this.children_ref = [
                    ...this.children_ref,
                    ...Array(children_count - this.children_ref.length)
                        .fill(undefined).map(() => {
                            return {
                                height: 0,
                                react_ref: React.createRef<HTMLDivElement>()
                            }
                        })
                ]

            } else {

                this.children_ref = this.children_ref.slice(0, children_count);

            }
        }

    }

    render() {
        this.trimChildrenRef();
        const h_spacing = this.props.hSpacing ?? 0;
        const v_spacing = this.props.vSpacing ?? 0;

        const columns: {
            height: number
            children: React.ReactNode[]
        }[] = Array(this.props.columns).fill(undefined).map(() => ({height: 0, children: []}));

        React.Children.forEach(this.props.children, (child, index) => {
            const column = columns.reduce((a, b) => {
                return a.height > b.height ? b : a;
            }, columns[0]);

            const ref = this.children_ref[index].react_ref;

            const element = <React.Fragment key={index}>
                {column.children.length === 0 ? null :
                    <div className={this.props.classes.cellSpacing} style={{height: v_spacing}}/>}
                <div key={index} className={this.props.classes.cell}
                     ref={this.children_ref[index].react_ref}>
                    {child}
                </div>
            </React.Fragment>;

            column.height += h_spacing + (ref.current?.offsetHeight ?? 0);
            column.children.push(element);

            return element;
        });

        return <div className={this.props.classes.root}>
            {columns.map((column, i) => {

                return <React.Fragment key={i}>
                    {i === 0 ? null : <div className={this.props.classes.columnSpacing} style={{width: v_spacing}}/>}
                    <div className={this.props.classes.column}>{column.children}</div>
                </React.Fragment>
            })}
        </div>;
    }
}

export default function (props: ColumnLayoutProps) {
    const classes = useStyles();
    return <ColumnLayout classes={classes} {...props}/>
};