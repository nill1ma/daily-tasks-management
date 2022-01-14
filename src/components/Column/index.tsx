import { DragEvent, useEffect, useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useCards } from "../../contexts/cards";
import { ICard } from "../../schemas/card";
import Card from "../Card";
import { CardsArea, ColumnContainer, ColumnHeader, FaPlus } from "./styles";
import { updateItemInLocalStorage } from "../../helpers/storage";
type ColumnProps = {
    columnId: string
    label: string
    handleModal: (isModalCard: boolean, columnId: string) => void
}

export default function Column({ label, columnId, handleModal }: ColumnProps) {
    const [cardsQtd, setCardsQtd] = useState<number>(0)

    const { cards, setCards } = useCards()

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
        updateCardsDroped(cardId)
        console.log('Dragble', cardId)
    }

    const updateCardsDroped = (cardId: string) => {
        const updatedCards = cards.map((card: ICard) => {
            if (card.id === cardId)
                card.columnId = columnId
            return card
        })
        setCards(updatedCards)
        updateItemInLocalStorage<ICard>('cards', updatedCards)
        console.log("updatedCards", updatedCards)
    }

    const dragOver = (e: any) => {
        e.preventDefault()
    }

    return <ColumnContainer onDrop={drop} onDragOver={dragOver} id={columnId}>
        <ColumnHeader>
            <div>
                <span>{cardsQtd}</span>
                <span>{label}</span>
            </div>
            <FaPlus onClick={() => handleModal(true, columnId)} icon={faPlus} />
        </ColumnHeader>
        <CardsArea>
            {(cards && cards.length > 0) && cards.map(({ id, columnId: cardColumnId, label, description }: ICard) => {
                return cardColumnId === columnId &&
                    <Card key={id} columnId={columnId} label={label} description={description} id={id} />;
            })}
        </CardsArea>
    </ColumnContainer>
}