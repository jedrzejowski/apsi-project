import {DataT} from "../types";
import encodeQueryData from "./encodeQueryData";

function appFetch(args: {
    state: DataT.AppState,
    method: "GET",
    url: string,
    params?: any
}) {
    const url = "http://" + args.state.backend_url + args.url + "?" + encodeQueryData(args.params)

    return fetch(url, {
        method: args.method,
        headers: new Headers({
            Accept: " */*",
            "Authorization": args.state.authorization,
        }),
        cache: "no-cache"
    })
}

export async function fetchDeviceList(state: DataT.AppState): Promise<DataT.DeviceShort[]> {
    const response = await appFetch({
        state,
        method: "GET",
        url: "/",
        params: {}
    });

    if (response.status !== 200) {
        throw new Error();
    }

    const {items} = await response.json();
    return items;
}