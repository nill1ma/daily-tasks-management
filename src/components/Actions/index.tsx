import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ActionsContainer, FaPlus } from "./styles";

type TActions = {
    labelOption: string
}

type ActionsProps = {
    actions: TActions[]
    findBy: string
}

export default function Actions(props: ActionsProps) {
    const { actions, findBy } = props
    return <ActionsContainer>
        <input type="text" name="filter" placeholder={`Filter ${findBy}`} />
        {actions.map((action: TActions) =>
            <div className="add">
                <FaPlus size="xs" icon={faPlus} />
                <span>{action.labelOption}</span>
            </div>
        )}
    </ActionsContainer>
}
