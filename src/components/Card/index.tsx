import { faCompressAlt, faEdit, faExpandAlt, faSave, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { ChangeEvent, DragEvent, useCallback, useState } from "react";
import { useCards } from "../../contexts/cards";
import { updateItemInLocalStorage } from "../../helpers/storage";
import { CardPriority, ICard, PriorityReferences } from "../../schemas/card";
import { CardContainer, ChoosePriority, Description, DescriptionTextArea, Footer, Icon, SOption, Title } from "./styles";

type CardProps = {
    card: ICard
    removeCard: (cardId: string) => void
}

export default function Card({
    card: {
        id,
        label,
        description,
        priority
    },
    removeCard
}: CardProps) {

    const [getHiden, setGetHiden] = useState(false)
    const { cards, setCards } = useCards()
    const [editDisabled, setEditDisabled] = useState<string>('')
    const [currentPriority, setCurrentPriority] = useState<CardPriority>(priority)

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
        fillCArd(name, value)
    }

    const fillCArd = (name: string, value: string | CardPriority) => {
        setCards((previous: ICard[]) => {
            return [...previous.map((prev: ICard) => {
                if (prev.id === id) {
                    prev[name] = value
                }
                return prev
            })]
        })
    }

    const save = () => {
        fillCArd('priority', currentPriority)
        updateItemInLocalStorage<ICard>('cards', cards)
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
                value={label}
                data-testid='title'
                onChange={(e: any) => fillCardTitleAndDescription(e)}
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
            <DescriptionTextArea data-testid='descriptionTextArea' getHiden={getHiden} disabled={editDisabled !== id} onChange={(e: any) => fillCardTitleAndDescription(e)} name="description" defaultValue={description} />
            : <Description data-testid='description' getHiden={getHiden}>{description}</Description>}
        <Footer code={currentPriority.code}>
            <div>
                <ChoosePriority code={currentPriority.code}>
                    <select disabled={editDisabled !== id} name="priority" onChange={(e: ChangeEvent<HTMLSelectElement>) => setCurrentPriority(JSON.parse(e.target.value))}>
                        {PriorityReferences.map(({ description, code }: CardPriority) => {
                            return <SOption data-testid={`selectPriority${id}`} key={id} selected={currentPriority.code === code} code={code} value={JSON.stringify({ description, code })}>{description}</SOption>
                        })}
                    </select>
                </ChoosePriority>
            </div>
            <Icon onClick={useCallback(() => removeCard(id), [removeCard])} icon={faTrashAlt} />
        </Footer>
    </CardContainer>
}