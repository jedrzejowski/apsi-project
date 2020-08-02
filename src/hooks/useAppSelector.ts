import type {DataT} from "../types";
import {useSelector} from "react-redux";

const useAppSelector = useSelector as <T>(
    functor: (state: DataT.AppState) => T,
    equalityFn?: (left: T, right: T) => boolean
) => T;

export default useAppSelector;