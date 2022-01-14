import { DragEvent, useCallback, useEffect, useState } from "react";
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
    const [cardsLength, setCardsLength] = useState<number>(0)

    const { cards, setCards } = useCards()

    const getCardsLength = useCallback(() => {
        if (cards && cards.length > 0) {
            const { length } = cards.filter((card: ICard) => card.columnId === columnId)
            setCardsLength(length)
            console.log('testing inside call')
        }
    }, [cards])

    useEffect(() => {
        getCardsLength()
    }, [getCardsLength])

    const drop = (e: DragEvent) => {
        e.preventDefault()
        const cardId = e.dataTransfer.getData('cardId')
        updateCardsDroped(cardId)
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
                <span>{cardsLength}</span>
                <span>{label}</span>
            </div>
            <FaPlus onClick={useCallback(() => handleModal(true, columnId), [])} icon={faPlus} />
        </ColumnHeader>
        <CardsArea>
            {(cards && cards.length > 0) && cards.map(({ id, columnId: cardColumnId, label, description }: ICard) => {
                return cardColumnId === columnId &&
                    <Card key={id} columnId={columnId} label={label} description={description} id={id} />;
            })}
        </CardsArea>
    </ColumnContainer>
}