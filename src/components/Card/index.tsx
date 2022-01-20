import { DragEvent } from "react";
import { ICard } from "../../schemas/card";
import { CardContainer, Description, Footer, Title } from "./styles";

export default function Card({
    id,
    label,
    description,
    priority: { description: prioritydDescription, code }
}: ICard) {

    const dragStart = (e: DragEvent | any) => {
        const { target } = e
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
    >
        <Title>{label}</Title>
        <Description>{description}</Description>
        <Footer code={code}>
            <span>proiority:</span>
            <span>{prioritydDescription}</span>
        </Footer>
    </CardContainer>
}