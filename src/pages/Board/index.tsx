import Actions from "../../components/Actions";
import Column from "../../components/Column";
import { useCards } from "../../contexts/cards";
import { ICoolumn } from "../../schemas/column";
import { BoardContainer, ColumnsArea, Header } from "./styles";
type TActions = {
    labelOption: string
}

const actions: TActions[] = [
    { labelOption: 'Add Board' },
    // {labelOption:'Add Column'}
]
export default function Board() {

    const { cards } = useCards()

    // const cardsMock: ICard[] = [
    //     { id: 1, columnId: 'todo', title: 'Study English', description: 'Train listening, reading, writen, gramar and gramar' },
    //     { id: 2, columnId: 'inprogress', title: 'Have lunch', description: 'Eat more vegetables, beans and rices.' },
    //     { id: 3, columnId: 'inprogress', title: 'Have lunch', description: 'Eat more vegetables, beans and rices.' },
    //     { id: 4, columnId: 'inprogress', title: 'Have lunch', description: 'Eat more vegetables, beans and rices.' },
    //     { id: 5, columnId: 'inprogress', title: 'Have lunch', description: 'Eat more vegetables, beans and rices.' },
    //     { id: 6, columnId: 'inprogress', title: 'Have lunch', description: 'Eat more vegetables, beans and rices.' }
    // ]

    const columns: ICoolumn[] = [
        { columnId: 'todo', columnName: 'To do' },
        { columnId: 'inprogress', columnName: 'In Progress' },
        { columnId: 'done', columnName: 'Done' }
    ]
    return <BoardContainer>
        <Header>
            <Actions actions={actions} findBy="Card" />
            <div className="projetName">
                <h3>Daily tasks management</h3>
            </div>
        </Header>
        <ColumnsArea>
            {columns.map((column: ICoolumn) =>
                <Column key={column.columnId} columnId={column.columnId} columnName={column.columnName} />
            )}
        </ColumnsArea>
    </BoardContainer>
}