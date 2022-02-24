import { addItemInLocalStorage, getLocalStorage } from "../../helpers/storage";
import { IBoard } from "../../schemas/board";
import { BoardsState } from "../../schemas/stores/boards-state";
import { Action } from "../actions";

const INITIAL_STATE: BoardsState = {
	boards: getLocalStorage("boards"),
};

function boardsState(state: BoardsState = INITIAL_STATE, action: Action) {
	switch (action.type) {
		case "ADD_BOARD":
			addItemInLocalStorage<IBoard>("board", action.payload);
			return { ...state, boards: [...state.boards, action.payload] };
		default:
			return state;
	}
}

export { boardsState };
