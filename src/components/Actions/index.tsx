import { useCards } from "../../contexts/cards";
import { TActions } from "../../schemas/actions";
import { ActionsContainer, FaPlus } from "./styles";

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
