import { IBoard } from "../schemas/board";
import { ICard } from "../schemas/card";
import { ICoolumn } from "../schemas/column";
export type Action<T> = {
	type: string;
	payload: T;
};

export const addBoard = (board: IBoard): Action<IBoard> => ({
	type: "ADD_BOARD",
	payload: board,
});

export const deleteBoard = (board: IBoard): Action<IBoard> => ({
	type: "DELETE_BOARD",
	payload: board,
});

export const addColumn = (column: ICoolumn): Action<ICoolumn> => ({
	type: "ADD_COLUMN",
	payload: column,
});

export const deleteColumn = (column: ICoolumn): Action<ICoolumn> => ({
	type: "DELETE_COLUMN",
	payload: column,
});

export const addCard = (card: ICard): Action<ICard> => ({
	type: "ADD_CARD",
	payload: card,
});

export const updateCard = (card: ICard): Action<ICard> => ({
	type: "UPDATE_CARD",
	payload: card,
});

export const deleteCard = (card: ICard): Action<ICard> => ({
	type: "DELETE_CARD",
	payload: card,
});