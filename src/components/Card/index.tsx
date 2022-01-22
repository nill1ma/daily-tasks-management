import { DragEvent, useState } from "react";
import { faCompressAlt, faExpandAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { ICard } from "../../schemas/card";
import { CardContainer, Description, Footer, Icon, Title } from "./styles";

export default function Card({
    id,
    label,
    description,
    priority: { description: prioritydDescription, code }
}: ICard) {


    const [getHiden, setGetHiden] = useState(false)

    const dragStart = (e: DragEvent | any) => {
        const { target } = e
        target.classList.add('cardDragging')
        e.dataTransfer.setData('cardId', target.id)
    }
    const dragOver = (e: any) => {
        e.stopPropagation()
    }
    return <CardContainer
        id={id}
        draggable={true}
        onDragStart={dragStart}
        onDragOver={dragOver}
        className={'cardDragble'}
    >
        <Title>
            <span>{label}</span>
            <div className="icons">
                <Icon onClick={() => setGetHiden((prev: boolean) => !prev)} icon={getHiden ? faExpandAlt : faCompressAlt} />
                <Icon icon={faTrashAlt} />
            </div>
        </Title>
        <Description getHiden={getHiden}>{description}</Description>
        <Footer code={code}>
            <span>{prioritydDescription}</span>
        </Footer>
    </CardContainer>
}