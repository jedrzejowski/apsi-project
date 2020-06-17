import {DataT} from "../types";
import encodeQueryData from "./encodeQueryData";

export default function appFetch(args: {
    state: DataT.AppState,
    method: "GET",
    url: string,
    params?: any
}) {
    const url = "http://" + args.state.backend_url + args.url + "?" + encodeQueryData(args.params)

    if (args.state.credentials?.type !== "data") {
        throw new Error();
    }

    return fetch(url, {
        method: args.method,
        headers: new Headers({
            Accept: " */*",
            "Authorization": args.state.credentials.data.authorization_token,
        }),
        cache: "no-cache"
    })
}