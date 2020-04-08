import type AppData from "./AppData";
import type {Action, Actions} from "./actions";

const initial_state: AppData.State = {

};

export default function myApp(state: AppData.State = initial_state, action: Action): AppData.State {

    let type: keyof Actions = action.type;

    switch (type) {


        default:
            return state;
    }
}