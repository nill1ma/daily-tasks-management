import { faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { DragEvent, useCallback, useEffect, useState } from "react";
import { useCards } from "../../contexts/cards";
import { removeItemFromLocalStorage, updateItemInLocalStorage } from "../../helpers/storage";
import { ICard } from "../../schemas/card";
import { v4 as uuidv4 } from 'uuid';
import { CardsArea, ColumnContainer, ColumnHeader, Icon } from "./styles";
import Card from "../Card";

type ColumnProps = {
    columnId: string
    label: string
    handleModal: (isModalCard: boolean, columnId: string) => void
    removeColumn: (columnId: string) => void
}

export default function Column({ label, columnId, handleModal, removeColumn }: ColumnProps) {

    const { cards, setCards } = useCards()
    const [columnCards, setColumnsCards] = useState<ICard[]>([] as ICard[])

    const getColumnCards = () => {
        if (cards && cards.length > 0) {
            const filteredCards = cards.filter((card: ICard) => card.columnId === columnId)
            setColumnsCards(filteredCards.sort((a: ICard, b: ICard) => a.priority.code - b.priority.code))
        }
    }

    const removeCard = (cardId: string) => {
        const updatedeCards = removeItemFromLocalStorage('cards', cardId)
        setCards([...updatedeCards])
    }

    useEffect(() => {
        getColumnCards()
    }, [cards])

    const drop = (e: DragEvent | any) => {
        e.preventDefault()
        const cardId = e.dataTransfer.getData('cardId')
        updateCardsDroped(cardId)
    }

    const updateCardsDroped = (cardId: string) => {
        var updatedCards = cards.map((card: ICard) => {
            if (card.id === cardId) {
                card.columnId = columnId
            }
            return card
        })
        setCards(updatedCards)
        updateItemInLocalStorage<ICard>('cards', updatedCards)
    }

    const addCard = () => {
        const initialCardValue: ICard = {
            id: uuidv4(),
            label: '',
            columnId,
            description: '',
            priority: { description: 'HIGH', code: 0 }
        }
        setCards([initialCardValue, ...cards])
    }

    const dragOver = (e: any) => {
        // const containers = document.querySelectorAll('.columnContainer')
        // containers.forEach(container => {
        e.preventDefault()
        //     const afterElement = getDragAfterElement(container, e.clientY)
        //     const draggable = document.querySelector('.cardDragging')!
        //     console.log('afterElement', afterElement)
        //     if (container.id === columnId) {
        //         afterElement == null ?
        //             container.appendChild(draggable)
        //             : container.insertBefore(draggable, afterElement)
        //     }
        // })
    }

    const getDragAfterElement = (container: any, y: any) => {
        const draggableElements = [...container.querySelectorAll('.cardDragble:not(.cardDragging)')]
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect()
            const offset = y - box.top - box.height / 2
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child }
            }
            return closest
        }, { offset: Number.NEGATIVE_INFINITY }).element
    }


    return <ColumnContainer onDragOver={dragOver} onDrop={drop}>
        <ColumnHeader>
            <div>
                <span>{columnCards.length}</span>
                <span>{label}</span>
            </div>
            <div>
                <Icon onClick={() => addCard()} icon={faPlus} />
                <Icon onClick={useCallback(() => removeColumn(columnId), [removeColumn])} icon={faTrashAlt} />
            </div>
        </ColumnHeader>
        <CardsArea id={columnId} onSelect={()=>{}} className="columnContainer">
            {columnCards.map(({ id, columnId: cardColumnId, label, description, priority }: ICard) => {
                return cardColumnId === columnId &&
                    <Card key={id} card={{ id, columnId: cardColumnId, label, description, priority }} removeCard={removeCard} />
            })}
        </CardsArea>
    </ColumnContainer>
}