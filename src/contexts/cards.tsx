import React, { createContext, ReactNode, useContext, useState } from "react";
import { ICard } from "../schemas/card";

const initialState: ICard[] = [{
    id: 0,
    title: '',
    description: '',
    columnId: '',
}]
type Props = {
    children: ReactNode
}

type TCardsState = {
    cards: ICard[] | null
    setCards: React.Dispatch<React.SetStateAction<ICard[] | null>>
}

const CardsContext = createContext<ICard[] | any>(initialState)

export default function CardsProvider({ children }: Props) {

    const [cards, setCards] = useState<TCardsState[] | null>(null)
    return <CardsContext.Provider value={{ cards, setCards }}>
        {children}
    </CardsContext.Provider>
}

export function useCards() {
    const context = useContext(CardsContext)
    const { cards, setCards } = context
    return { cards, setCards }
}