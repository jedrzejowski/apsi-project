import type Lang from "../Lang";
import type {Dictionary} from "../../types";
import english from "./english";
import polish from "./english";

const Languages: Dictionary<Lang> = {
    default: english,
    polish
};

export default Languages;
