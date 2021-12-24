import { useEffect, useState } from "react";
import Card from "../Card";
import { CardsArea, ColumnContainer, ColumnNameArea } from "./styles";
type ColumnProps = {
    columnId: string
    columnName: string
    cards: Cards[]
}

type Cards = {
    title: string
    description: string
    columnId: string
}

export default function Column(props: ColumnProps) {
    const { columnName, cards, columnId } = props
    const [cardsQtd, setCardsQtd] = useState<number>(0)
    // const [totalHeight, setTotalHeight] = useState(0)

    useEffect(() => {
        const { length } = cards.filter(card => card.columnId === columnId)
        setCardsQtd(length)
    }, [cards])

    return <ColumnContainer>
        <ColumnNameArea>
            <span>{cardsQtd}</span>
            <span>{columnName}</span>
        </ColumnNameArea>
        <CardsArea>
            {cards.map((card: Cards) => {
                return card.columnId === columnId &&
                    <Card columnId={card.columnId} title={card.title} description={card.description} />;                    
            })}
        </CardsArea>
    </ColumnContainer>
}