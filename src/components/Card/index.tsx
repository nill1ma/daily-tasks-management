import { faCompressAlt, faEdit, faExpandAlt, faSave, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { ChangeEvent, DragEvent, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCards } from "../../contexts/cards";
import { updateItemInLocalStorage } from "../../helpers/storage";
import { CardPriority, ICard, PriorityReferences } from "../../schemas/card";
import { updateCard } from "../../store/actions";
import { RootState } from "../../store/reducers";
import { CardContainer, ChoosePriority, Description, DescriptionTextArea, Footer, Icon, SOption, Title } from "./styles";

type CardProps = {
    card: ICard
    removeCard: (card: ICard) => void
}

export default function Card({
    card,
    removeCard
}: CardProps) {

    const { id, label, description, priority } = card

    const [getHiden, setGetHiden] = useState(false)
    // const { cards, setCards } = useCards()
    const dispatch = useDispatch()
    const cards = useSelector(({ cards: { data } }: RootState) => data)
    const [editDisabled, setEditDisabled] = useState<string>('')
    const [currentPriority, setCurrentPriority] = useState<CardPriority>(priority)
    const [fields, setFields] = useState<ICard>(card)

    const dragStart = (e: DragEvent | any) => {
        const { target } = e
        target.classList.add('cardDragging')
        e.dataTransfer.setData('cardId', target.id)
    }
    const dragOver = (e: any) => {
        e.stopPropagation()
    }

    const dragEnd = (e: any) => {
        const { target } = e
        target.classList.remove('cardDragging')
    }

    const fillCardTitleAndDescription = (e: ChangeEvent<HTMLInputElement>) => {
        const { target: { name, value } } = e
        // fillCArd(name, value)
    }

    const fillCard = (e: ChangeEvent<HTMLInputElement>) => {
        const { target: { name, value } } = e
        setFields((previous: ICard) => {
            return {
                ...previous,
                [name]: value
            }
        })
    }

    const save = () => {
        // fillCArd('priority', currentPriority)
        // updateItemInLocalStorage<ICard>('cards', cards)
        dispatch(updateCard(fields))
        setEditDisabled('')
    }

    const activeEditable = (id: string) => {
        setEditDisabled(id)
    }
    return <CardContainer
        isEditable={editDisabled === id}
        id={id}
        draggable={true}
        onDragStart={dragStart}
        onDragOver={dragOver}
        onDragEnd={dragEnd}
        className={'cardDragble'}>
        <Title>
            <input name="label"
                value={fields.label}
                data-testid='title'
                onChange={(e: any) => fillCard(e)}
                disabled={editDisabled !== id}
                type={'text'} />
            <div className="icons">
                {editDisabled === id ?
                    <Icon data-testid='saveEdition' onClick={() => save()} icon={faSave} />
                    : <Icon data-testid='activeEditable' onClick={() => activeEditable(id)} icon={faEdit} />
                }
                <Icon data-testid='descriptionShowedOrHidenButton' onClick={() => setGetHiden((prev: boolean) => !prev)} icon={getHiden ? faExpandAlt : faCompressAlt} />
            </div>
        </Title>
        {editDisabled === id ?
            <DescriptionTextArea data-testid='descriptionTextArea' getHiden={getHiden} disabled={editDisabled !== id} onChange={(e: any) => fillCard(e)} name="description" defaultValue={fields.description} />
            : <Description data-testid='description' getHiden={getHiden}>{fields.description}</Description>}
        <Footer code={currentPriority.code}>
            <div>
                <ChoosePriority code={currentPriority.code}>
                    <select disabled={editDisabled !== id} name="priority" onChange={(e: ChangeEvent<HTMLSelectElement>) => fillCard(JSON.parse(e.target.value))}>
                        {PriorityReferences.map(({ description, code }: CardPriority) => {
                            return <SOption data-testid={`selectPriority${id}`} key={id} selected={currentPriority.code === code} code={code} value={JSON.stringify({ description, code })}>{description}</SOption>
                        })}
                    </select>
                </ChoosePriority>
            </div>
            <Icon onClick={useCallback(() => removeCard(card), [removeCard])} icon={faTrashAlt} />
        </Footer>
    </CardContainer>
}