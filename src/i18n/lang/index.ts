import type {Dictionary} from "../../types";
import type Lang from "../Lang";

import english from "./english";
import polish from "./polish";

const Languages: Dictionary<Lang> = {
    default: english,
    polish
};

export default Languages;