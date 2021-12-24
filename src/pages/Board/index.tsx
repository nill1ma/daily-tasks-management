import Actions from "../../components/Actions";
import Column from "../../components/Column";
import { ICard } from "../../schemas/card";
import { ICoolumn } from "../../schemas/column";
import { BoardContainer, ColumnsArea, Header } from "./styles";
type TActions = {
    labelOption: string
}

const actions:TActions[] = [
    {labelOption:'Add Card'},
    {labelOption:'Add Column'}
]
export default function Board() {
    const cards: ICard[] = [
        { columnId: 'todo', title: 'Study English', description: 'Train listening, reading, writen, gramar and gramar' },
        { columnId: 'inprogress', title: 'Have lunch', description: 'Eat more vegetables, beans and rices.' },
        { columnId: 'inprogress', title: 'Have lunch', description: 'Eat more vegetables, beans and rices.' },
        { columnId: 'inprogress', title: 'Have lunch', description: 'Eat more vegetables, beans and rices.' },
        { columnId: 'inprogress', title: 'Have lunch', description: 'Eat more vegetables, beans and rices.' },
        { columnId: 'inprogress', title: 'Have lunch', description: 'Eat more vegetables, beans and rices.' }
    ]

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
        <ColumnsArea length={columns.length}>
            {columns.map((column: ICoolumn) =>
                <Column columnId={column.columnId} columnName={column.columnName} cards={cards} />
            )}
        </ColumnsArea>
    </BoardContainer>
}