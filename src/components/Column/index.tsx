import { useEffect, useState } from "react";
import { useStore } from "react-redux";
import Card from "../Card";
import { ColumnContainer, ColumnNameArea } from "./styles";
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

    useEffect(() => {
        const { length } = cards.filter(card => card.columnId === columnId)
        setCardsQtd(length)
    }, [cards])

    return <ColumnContainer>
        <ColumnNameArea>
            <span>{cardsQtd}</span>
            <span>{columnName}</span>
        </ColumnNameArea>
        {cards.map((card: Cards) =>
            card.columnId === columnId &&
            <Card columnId={card.columnId} title={card.title} description={card.description} />
        )}
    </ColumnContainer>
}