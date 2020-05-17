import {DataT} from "../types";
import {useSelector} from "react-redux";

export default function useAppSelector<T>(
    functor: (state: DataT.AppState) => T
): T {
    return useSelector(functor);
}