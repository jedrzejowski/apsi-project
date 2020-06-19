import React from "react";
import {LanguageContext} from "./TranslateProvider";
import get from "lodash/get";
import type Lang from "./Lang";

const translate_regex = /^[a-zA-Z0-9\._]+$/;

function translate(lang: Lang, id: string) {
    if (translate_regex.test(id)) {
        return get(lang, id, id) + "";
    } else {
        return id;
    }
}

export default function () {
    const {language} = React.useContext(LanguageContext);

    return (id: string) => translate(language, id);
}
