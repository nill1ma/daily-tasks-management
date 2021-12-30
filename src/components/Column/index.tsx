import { useEffect, useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useCards } from "../../contexts/cards";
import { ICard } from "../../schemas/card";
import Card from "../Card";
import { CardsArea, ColumnContainer, ColumnHeader, FaPlus } from "./styles";
type ColumnProps = {
    columnId: string
    columnName: string
    handleModal: (isModalCard: boolean, columnId:string) => void
}

export default function Column({ columnName, columnId, handleModal }: ColumnProps) {
    const [cardsQtd, setCardsQtd] = useState<number>(0)

    const { cards } = useCards()

    useEffect(() => {
        if (cards && cards.length > 0) {
            const { length } = cards.filter((card: ICard) => card.columnId === columnId)
            setCardsQtd(length)
        }
    }, [cards])

    return <ColumnContainer>
        <ColumnHeader>
            <div>
                <span>{cardsQtd}</span>
                <span>{columnName}</span>
            </div>
            <FaPlus onClick={() => handleModal(true, columnId)} icon={faPlus} />
        </ColumnHeader>
        <CardsArea>
            {(cards && cards.length > 0) && cards.map((card: ICard) => {
                return card.columnId === columnId &&
                    <Card key={card.id} columnId={card.columnId} title={card.title} description={card.description} />;
            })}
        </CardsArea>
    </ColumnContainer>
}