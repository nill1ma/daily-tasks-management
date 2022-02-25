import { faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { DragEvent, useCallback, useEffect, useState } from "react";
import { useCards } from "../../contexts/cards";
import { removeItemFromLocalStorage, updateItemInLocalStorage } from "../../helpers/storage";
import { ICard } from "../../schemas/card";
import { v4 as uuidv4 } from 'uuid';
import { CardsArea, ColumnContainer, ColumnHeader, Icon } from "./styles";
import Card from "../Card";
import { hasElementInArray } from "../../helpers/validations";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/reducers";
import { addCard, deleteCard } from "../../store/actions";
import { ICoolumn } from "../../schemas/column";

type ColumnProps = {
    column: ICoolumn,
    handleModal: (isModalCard: boolean, columnId: string) => void
    removeColumn: (column: ICoolumn) => void
}

export default function Column({ column, handleModal, removeColumn }: ColumnProps) {
    const { id: columnId, label } = column

    const { setCards } = useCards()
    const dispatch = useDispatch()
    const cards = useSelector(({ cards: { data } }: RootState) => data)
    const [columnCards, setColumnsCards] = useState<ICard[]>([] as ICard[])

    const getColumnCards = () => {
        if (hasElementInArray(cards)) {
            const filteredCards = cards.filter((card: ICard) => card.columnId === columnId)
            setColumnsCards(filteredCards.sort((a: ICard, b: ICard) => a.priority.code - b.priority.code))
        }
    }

    const removeCard = (card: ICard) => {
        dispatch(deleteCard(card))
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

    const save = () => {
        const value: ICard = {
            id: uuidv4(),
            label: '',
            columnId,
            description: '',
            priority: { description: 'HIGH', code: 0 }
        }
        dispatch(addCard(value))
    }

    const dragOver = (e: any) => {
        e.preventDefault()
    }

    return <ColumnContainer onDragOver={dragOver} onDrop={drop}>
        <ColumnHeader>
            <div>
                <span data-testid='numberOfCardInCurrentColumn'>{columnCards.length}</span>
                <span>{label}</span>
            </div>
            <div>
                <Icon onClick={() => save()} icon={faPlus} />
                <Icon onClick={useCallback(() => removeColumn(column), [removeColumn])} icon={faTrashAlt} />
            </div>
        </ColumnHeader>
        <CardsArea id={columnId} className="columnContainer">
            {columnCards.map(({ id, columnId: cardColumnId, label, description, priority }: ICard) => {
                return cardColumnId === columnId &&
                    <Card key={id} card={{ id, columnId, label, description, priority }} removeCard={removeCard} />
            })}
        </CardsArea>
    </ColumnContainer>
}