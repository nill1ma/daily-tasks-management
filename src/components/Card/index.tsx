import { faCompressAlt, faEdit, faExpandAlt, faSave, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { ChangeEvent, DragEvent, useCallback, useState } from "react";
import { useCards } from "../../contexts/cards";
import { updateItemInLocalStorage } from "../../helpers/storage";
import { ICard, mountPriotity, PriorityReferences } from "../../schemas/card";
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
        priority: { description: prioritydDescription, code }
    },
    removeCard
}: CardProps) {

    const [getHiden, setGetHiden] = useState(false)
    const { cards, setCards } = useCards()
    const [editDisabled, setEditDisabled] = useState<string>('')

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

    const fillCardContent = (e: React.ChangeEvent<HTMLInputElement>, cardId: string) => {
        const { target: { name, value } } = e
        setCards((previous: ICard[]) => {
            return [...previous.map((prev: ICard) => {
                if ('priority' === name && prev.id === cardId)
                    prev[name] = mountPriotity(value)
                else if (prev.id === cardId)
                    prev[name] = value
                return prev
            })]
        })
    }
    const save = () => {
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
        className={'cardDragble'}
    >
        <Title>
            <input name="label"
                value={label}
                data-testid='title'
                onChange={(e: any) => fillCardContent(e, id)}
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
            <DescriptionTextArea data-testid='descriptionTextArea' getHiden={getHiden} disabled={editDisabled !== id} onChange={(e: any) => fillCardContent(e, id)} name="description" defaultValue={description} />
        : <Description data-testid='description' getHiden={getHiden}>{description}</Description>}
        <Footer code={code}>
            <div>
                <ChoosePriority code={code}>
                    <select disabled={editDisabled !== id} name="priority" onChange={(e: any) => fillCardContent(e, id)}>
                        {Object.keys(PriorityReferences).map((priority) => {
                            const { code: codePriority, description } = mountPriotity(priority)
                            return <SOption key={codePriority} selected={codePriority === code} code={codePriority} value={priority}>{description}</SOption>
                        })}
                    </select>
                </ChoosePriority>
            </div>
            <Icon onClick={useCallback(() => removeCard(id), [removeCard])} icon={faTrashAlt} />
        </Footer>
    </CardContainer>
}