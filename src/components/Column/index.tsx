import { faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { DragEvent, useCallback, useEffect, useState } from "react";
import { useCards } from "../../contexts/cards";
import { updateItemInLocalStorage } from "../../helpers/storage";
import { ICard } from "../../schemas/card";
import Card from "../Card";
import { CardsArea, ColumnContainer, ColumnHeader, Icon } from "./styles";

type ColumnProps = {
    columnId: string
    label: string
    handleModal: (isModalCard: boolean, columnId: string) => void
    removeColumn: (columnId: string) => void
}

export default function Column({ label, columnId, handleModal, removeColumn }: ColumnProps) {

    const { cards, setCards } = useCards()
    const [columnCards, setColumnsCards] = useState<ICard[]>([] as ICard[])

    const getColumnCards = useCallback(() => {
        if (cards && cards.length > 0) {
            const filteredCards = cards.filter((card: ICard) => card.columnId === columnId)
            setColumnsCards(filteredCards.sort((a: ICard, b: ICard) => a.priority.code - b.priority.code))
        }
    }, [cards, columnId])

    useEffect(() => {
        getColumnCards()
    }, [getColumnCards])

    const drop = (e: DragEvent | any) => {
        e.preventDefault()
        const cardId = e.dataTransfer.getData('cardId')
        updateCardsDroped(cardId)
    }

    const updateCardsDroped = (cardId: string, priority?:any) => {
        var updatedCards = cards.map((card: ICard, index: number) => {
            if (card.id === cardId && card.columnId !== columnId) {
                card.columnId = columnId
            }
            return card
        })
        setCards(updatedCards)
        updateItemInLocalStorage<ICard>('cards', updatedCards)
    }

    const dragOver = (e: any) => {
        e.preventDefault()
    }

    return <ColumnContainer className="columnContainer" onDrop={drop} onDragOver={dragOver} id={columnId}>
        <ColumnHeader>
            <div>
                <span>{columnCards.length}</span>
                <span>{label}</span>
            </div>
            <div>
                <Icon onClick={useCallback(() => handleModal(true, columnId), [handleModal])} icon={faPlus} />
                <Icon onClick={useCallback(() => removeColumn(columnId), [removeColumn])} icon={faTrashAlt} />
            </div>
        </ColumnHeader>
        <CardsArea>
            {columnCards.map(({ id, columnId: cardColumnId, label, description, priority }: ICard, index: number) => {
                return cardColumnId === columnId &&
                    <Card key={id} columnId={columnId} label={label} description={description} priority={priority} id={id} />
            })}
        </CardsArea>
    </ColumnContainer>
}