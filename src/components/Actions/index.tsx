import { TActions } from "../../schemas/actions";
import { ActionsContainer, FaPlus } from "./styles";

type ActionsProps = {
    actions: TActions[]
    findBy: string
    filterAction: (value: string) => void
}

export default function Actions({ actions, findBy, filterAction }: ActionsProps) {
    
    let timer: any = null
    const handleFilter = (event: any) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            const { target: { value } } = event
            filterAction(value)
        }, 1000)
    }

    return <ActionsContainer>
        <input type="text" name="filter" placeholder={`Filter ${findBy}`} onChange={(e) => handleFilter(e)} />
        {actions.map((action: TActions) =>
            <div key={action.labelOption} onClick={() => action.handleModal()} className="add">
                <FaPlus size="lg" icon={action.icon} />
                <span>{action.labelOption}</span>
            </div>
        )}
    </ActionsContainer>
}

// export const Actions = memo(ActionsComponent)