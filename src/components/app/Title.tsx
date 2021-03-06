import React, {useContext, useEffect, useState} from "react";
import noop from "../../lib/noop";

interface TitleI {
    title: string,
    setTitle: (title: string) => void
}

const TitleContext = React.createContext<TitleI>({title: document.title, setTitle: noop});

export function useTitle() {
    return useContext(TitleContext).title;
}

export function TitleProvider(props: {
    children: React.ReactNode
}) {
    const [title, setTitle] = useState(document.title);
    document.title = title;

    return <TitleContext.Provider value={{title, setTitle}}>
        {props.children}
    </TitleContext.Provider>
}

export default function Title(props: {
    title: string
}) {
    const title_context = useContext(TitleContext);

    useEffect(() => {
        title_context.setTitle(props.title)
    }, [props.title]);

    return null;
}