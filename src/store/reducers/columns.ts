import { addItemInLocalStorage, getLocalStorage, removeItemFromLocalStorage, updateItemInLocalStorage } from "../../helpers/storage";
import { IBoard } from "../../schemas/board";
import { ICard } from "../../schemas/card";
import { ICoolumn } from "../../schemas/column";
import { CardsState } from "../../schemas/stores/cards-state";
import { ColumnsState } from "../../schemas/stores/columns-state";
import { Action } from "../actions";

const INITIAL_STATE: ColumnsState = {
    data: getLocalStorage("columns"),
};

function columnsReducer(state: ColumnsState = INITIAL_STATE, action: Action<ICard>) {
    switch (action.type) {
        case "ADD_COLUMN":
            addItemInLocalStorage<ICoolumn>("columns", action.payload);
            return { ...state, data: [...state.data, action.payload] };
        // case "UPDATE_CARD":
        //     const cards = getCardsUpdate(state, action.payload.id)
        //     updateItemInLocalStorage<ICard>("cards", cards);
        //     return { data: [...cards] };
        case "DELETE_COLUMN":
            removeItemFromLocalStorage<ICoolumn>("columns", action.payload.id);
            return { ...state, data: [...state.data.filter(({ id }: ICoolumn) => id !== action.payload.id)] }
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


export { columnsReducer };
