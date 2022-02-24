import { IBoard } from "../schemas/board";
import { ICard } from "../schemas/card";
export type Action<T> = {
	type: string;
	payload: T;
};

const addBoard = (board: IBoard): Action<IBoard> => ({
	type: "ADD_BOARD",
	payload: board,
});

const deleteBoard = (board: IBoard): Action<IBoard> => ({
	type: "DELETE_BOARD",
	payload: board,
});

const addCard = (card: ICard): Action<ICard> => ({
	type: "ADD_CARD",
	payload: card,
});

const deleteCard = (card: ICard): Action<ICard> => ({
	type: "DELETE_CARD",
	payload: card,
});

export { addBoard, deleteBoard, addCard, deleteCard };
