import { ICard } from "../../schemas/card";
import { CardContainer, Title, Description } from "./styles";

export default function Card({ title, description }: ICard) {
    return <CardContainer draggable={true}>
        <Title>{title}</Title>
        <Description>{description}</Description>
    </CardContainer>
}