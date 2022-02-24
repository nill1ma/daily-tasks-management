import { combineReducers } from "redux";
import { boardsState } from "./boards";

const reducers = combineReducers({
	boardsState,
});

export { reducers };
