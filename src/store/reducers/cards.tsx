

import { addItemInLocalStorage, getLocalStorage, removeItemFromLocalStorage, updateItemInLocalStorage } from "../../helpers/storage";
import { IBoard } from "../../schemas/board";
import { ICard } from "../../schemas/card";
import { CardsState } from "../../schemas/stores/cards-state";
import { Action } from "../actions";

const INITIAL_STATE: CardsState = {
    data: getLocalStorage("cards"),
};

function cardsReducer(state: CardsState = INITIAL_STATE, action: Action<ICard>) {
    switch (action.type) {
        case "ADD_CARD":
            addItemInLocalStorage<ICard>("cards", action.payload);
            return { ...state, data: [...state.data, action.payload] };
        case "UPDATE_CARD":
            const cards = getCardsUpdate(state, action.payload.id)
            updateItemInLocalStorage<ICard>("cards", cards);
            return { data: [...cards] };
        case "DELETE_CARD":
            removeItemFromLocalStorage<IBoard>("board", action.payload.id);
            return { ...state, data: [...state.data.filter(({ id }: ICard) => id !== action.payload.id)] }
        default:
            return state;
    }
}

function getCardsUpdate(state: CardsState, id: string) {
    return state.data.map((card: ICard) => {
        if (card.id === id) {
            card.columnId = id
        }
        return card
    })
}


export { cardsReducer };
