

import { addItemInLocalStorage, getLocalStorage, removeItemFromLocalStorage } from "../../helpers/storage";
import { IBoard } from "../../schemas/board";
import { ICard } from "../../schemas/card";
import { CardsState } from "../../schemas/stores/cards-state";
import { Action } from "../actions";

const INITIAL_STATE: CardsState = {
    data: getLocalStorage("cards"),
};

function cardsReducer(state: CardsState = INITIAL_STATE, action: Action<IBoard>) {
    switch (action.type) {
        case "ADD_CARD":
            addItemInLocalStorage<ICard>("cards", action.payload);
            return { ...state, data: [...state.data, action.payload] };
        case "DELETE_CARD":
            removeItemFromLocalStorage<IBoard>("board", action.payload.id);
            return { ...state, data: [...state.data.filter(({ id }: ICard) => id !== action.payload.id)] }
        default:
            return state;
    }
}

export { cardsReducer };
