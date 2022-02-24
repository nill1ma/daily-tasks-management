import { addItemInLocalStorage, getLocalStorage, removeItemFromLocalStorage } from "../../helpers/storage";
import { IBoard } from "../../schemas/board";
import { BoardsState } from "../../schemas/stores/boards-state";
import { Action } from "../actions";

const INITIAL_STATE: BoardsState = {
	data: getLocalStorage("board"),
};

function boardsReducer(state: BoardsState = INITIAL_STATE, action: Action<IBoard>) {
	switch (action.type) {
		case "ADD_BOARD":
			addItemInLocalStorage<IBoard>("board", action.payload);
			return { ...state, data: [...state.data, action.payload] };
		case "DELETE_BOARD":
			removeItemFromLocalStorage<IBoard>("board", action.payload.id);
			return { ...state, boards: [...state.data.filter(({ id }: IBoard) => id !== action.payload.id)] };
		default:
			return state;
	}
}

export { boardsReducer };
