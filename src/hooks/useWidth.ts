import useTheme from "@material-ui/core/styles/useTheme";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {Breakpoint} from "@material-ui/core/styles/createBreakpoints";

type BreakpointOrNull = Breakpoint | null;

export default function () {
    const theme = useTheme();
    const keys: Breakpoint[] = [...theme.breakpoints.keys].reverse();
    return (
        keys.reduce((output: BreakpointOrNull, key: Breakpoint) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const matches = useMediaQuery(theme.breakpoints.up(key));
            return !output && matches ? key : output;
        }, null) || "xs"
    );
}