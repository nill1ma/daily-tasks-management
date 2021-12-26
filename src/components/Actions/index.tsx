import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { useCards } from "../../contexts/cards";
import { ActionsContainer, FaPlus } from "./styles";

type TActions = {
    labelOption: string
    setContext: () => void
}

type ActionsProps = {
    actions: TActions[]
    findBy: string
}

export default function Actions(props: ActionsProps) {

    const { cards, setCards } = useCards()

    useEffect(() => {
        console.log('cards')
        console.log(cards)
        console.log('cards')
    }, [cards])


    const { actions, findBy } = props
    return <ActionsContainer>
        <input type="text" name="filter" placeholder={`Filter ${findBy}`} />
        {actions.map((action: TActions) =>
            <div onClick={() => action.setContext()} className="add">
                <FaPlus size="xs" icon={faPlus} />
                <span>{action.labelOption}</span>
            </div>
        )}
    </ActionsContainer>
}
