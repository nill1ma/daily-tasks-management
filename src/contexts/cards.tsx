import React, { createContext, ReactNode, useContext, useState } from "react";
import { getLocalStorage } from "../helpers/storage";
import { ICard } from "../schemas/card";

const initialState: ICard[] = getLocalStorage('cards')
type Props = {
    children: ReactNode
}

type TCardsState = {
    cards: ICard[]
    setCards: React.Dispatch<React.SetStateAction<ICard[] | any>>
}

const CardsContext = createContext<ICard[] | any>(initialState)

export default function CardsProvider({ children }: Props) {

    const [cards, setCards] = useState<TCardsState[] | any>(initialState)
    return <CardsContext.Provider value={{ cards, setCards }}>
        {children}
    </CardsContext.Provider>
}

export function useCards() {
    const context = useContext(CardsContext)
    const { cards, setCards } = context
    return { cards, setCards }
}