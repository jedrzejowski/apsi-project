import {DataT} from "../types";
import encodeQueryData from "./encodeQueryData";

export default function apiFetch(args: {
    method: "GET" | "PUT" | "POST",
    url: string,
    params?: any,
    headers?: any
}) {
    const url = `${location.origin}/api${args.url}?${encodeQueryData(args.params)}`;

    return fetch(url, {
        method: args.method,
        headers: new Headers({
            Accept: "*/*",
            ...(args.headers ?? {})
        }),
        cache: "no-cache"
    })
}