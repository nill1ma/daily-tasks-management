import { useEffect, useState } from "react";
import { useCards } from "../../contexts/cards";
import { ICard } from "../../schemas/card";
import Card from "../Card";
import { CardsArea, ColumnContainer, ColumnNameArea } from "./styles";
type ColumnProps = {
    columnId: string
    columnName: string
}

export default function Column(props: ColumnProps) {
    const { columnName, columnId } = props
    const [cardsQtd, setCardsQtd] = useState<number>(0)
    // const [totalHeight, setTotalHeight] = useState(0)

    const { cards, setCards } = useCards()

    useEffect(() => {
        if (cards && cards.length > 0) {
            const { length } = cards.filter((card: ICard) => card.columnId === columnId)
            setCardsQtd(length)
        }
    }, [cards])

    return <ColumnContainer>
        <ColumnNameArea>
            <span>{cardsQtd}</span>
            <span>{columnName}</span>
        </ColumnNameArea>
        <CardsArea>
            {(cards && cards.length > 0) && cards.map((card: ICard) => {
                return card.columnId === columnId &&
                    <Card key={card.id} columnId={card.columnId} title={card.title} description={card.description} />;
            })}
        </CardsArea>
    </ColumnContainer>
}