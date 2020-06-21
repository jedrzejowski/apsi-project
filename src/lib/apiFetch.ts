import encodeQueryData from "./encodeQueryData";

type HtmlMethod = "GET" | "PUT" | "POST" | "DELETE";

export default function apiFetch(args: {
    method: HtmlMethod,
    url: string,
    body?: any,
    params?: any,
    headers?: any
}) {
    const url = `${location.origin}/api${args.url}?${encodeQueryData(args.params ?? {})}`;

    return fetch(url, {
        method: args.method,
        headers: new Headers({
            Accept: "*/*",
            ...(args.headers ?? {})
        }),
        cache: "no-cache",
        body: args.body
    })
}

apiFetch.jsonBody = function (method: Exclude<HtmlMethod, "GET">, url: string, body: any) {
    return apiFetch({
        method,
        url,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
}