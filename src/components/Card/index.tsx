import { CardContainer, Title, Description } from "./styles";
type CardProps = {
    title: string
    description: string
    columnId: string
}

export default function Card(props: CardProps) {
    const { title, description } = props
    return <CardContainer draggable={true}>
        <Title>{title}</Title>
        <Description>{description}</Description>
    </CardContainer>
}