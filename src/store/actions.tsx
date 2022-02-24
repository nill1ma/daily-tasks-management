import { IBoard } from "../schemas/board";
export type Action = {
	type: string;
	payload: IBoard;
};

const addBoard = (board: IBoard): Action => ({
	type: "ADD_BOARD",
	payload: board,
});

export { addBoard };
