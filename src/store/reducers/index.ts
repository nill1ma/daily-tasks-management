import { combineReducers } from "redux";
import { boardsReducer } from "./boards";
import { cardsReducer } from "./cards";
import { columnsReducer } from "./columns";

const reducers = combineReducers({
	boards: boardsReducer,
	cards: cardsReducer,
	columns: columnsReducer
});

export type RootState = ReturnType<typeof reducers>;

export default reducers;
