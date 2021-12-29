import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { useCards } from "../../contexts/cards";
import { ActionsContainer, FaPlus } from "./styles";

type TActions = {
    labelOption: string
    handleModal: (isItCard?: boolean) => void
    icon: IconDefinition
}

type ActionsProps = {
    actions: TActions[]
    findBy: string
}

export default function Actions({ actions, findBy }: ActionsProps) {

    const { cards, setCards } = useCards()

    return <ActionsContainer>
        <input type="text" name="filter" placeholder={`Filter ${findBy}`} />
        {actions.map((action: TActions) =>
            <div onClick={() => action.handleModal()} className="add">
                <FaPlus size="lg" icon={action.icon} />
                <span>{action.labelOption}</span>
            </div>
        )}
    </ActionsContainer>
}
