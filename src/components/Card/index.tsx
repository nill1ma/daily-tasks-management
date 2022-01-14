import { DragEvent, useEffect } from "react";
import { ICard } from "../../schemas/card";
import { CardContainer, Title, Description } from "./styles";

export default function Card({ id, label, description }: ICard) {
    useEffect(()=>{
        console.log('Testing card rerendering')
    },[id, label, description])

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
    </CardContainer>
}