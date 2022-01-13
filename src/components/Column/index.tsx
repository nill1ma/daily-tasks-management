import { DragEvent, useEffect, useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useCards } from "../../contexts/cards";
import { ICard } from "../../schemas/card";
import Card from "../Card";
import { CardsArea, ColumnContainer, ColumnHeader, FaPlus } from "./styles";
type ColumnProps = {
    columnId: string
    label: string
    handleModal: (isModalCard: boolean, columnId: string) => void
}

export default function Column({ label, columnId, handleModal }: ColumnProps) {
    const [cardsQtd, setCardsQtd] = useState<number>(0)

    const { cards } = useCards()

    useEffect(() => {
        if (cards && cards.length > 0) {
            const { length } = cards.filter((card: ICard) => card.columnId === columnId)
            setCardsQtd(length)
        }
    }, [cards])

    const drop = (e: DragEvent) => {
        e.preventDefault()
        const cardId = e.dataTransfer.getData('cardId')
        const card = document.getElementById(cardId)
        console.log('Dragble',{card})
    }

    const dragOver = (e:any) => {
        e.preventDefault()
    }

    return <ColumnContainer>
        <ColumnHeader>
            <div>
                <span>{cardsQtd}</span>
                <span>{label}</span>
            </div>
            <FaPlus onClick={() => handleModal(true, columnId)} icon={faPlus} />
        </ColumnHeader>
        <CardsArea onDrop={drop} onDragOver={dragOver} id={columnId}>
            {(cards && cards.length > 0) && cards.map(({ id, columnId: cardColumnId, label, description }: ICard) => {
                return cardColumnId === columnId &&
                    <Card key={id} columnId={columnId} label={label} description={description} id={id} />;
            })}
        </CardsArea>
    </ColumnContainer>
}