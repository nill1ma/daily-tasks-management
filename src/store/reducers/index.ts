import { combineReducers } from "redux";
import { boardsReducer } from "./boards";
import { cardsReducer } from "./cards";

const reducers = combineReducers({
	boards: boardsReducer,
	cards: cardsReducer
});

export type RootState = ReturnType<typeof reducers>;

export default reducers;
