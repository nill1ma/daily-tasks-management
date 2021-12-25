import Actions from "../../components/Actions";
import { Board, BoardsArea, BoardsContainer, Header } from "./styles";
type TActions = {
    labelOption: string
}

const actions: TActions[] = [
    { labelOption: 'Add Board' }
]
export default function Boards() {

    const boards = [
        { name: 'Travel preparation', color: 'green', backGoundcolor: 'orange' },
        { name: 'Travel preparation', color: 'green', backGoundcolor: 'orange' },
        { name: 'Travel preparation', color: 'green', backGoundcolor: 'orange' },
        { name: 'Travel preparation', color: 'green', backGoundcolor: 'orange' },
        { name: 'Travel preparation', color: 'green', backGoundcolor: 'orange' },
        { name: 'House tasks', color: 'green', backGoundcolor: 'orange' },
        { name: 'Work time', color: 'blue', backGoundcolor: 'orange' },
        { name: 'Work time', color: 'blue', backGoundcolor: 'orange' },
        { name: 'Work time', color: 'blue', backGoundcolor: 'orange' }, 
    ]
    return <BoardsContainer>
        <Header>
            <Actions actions={actions} findBy="Card" />
            <div className="projetName">
                <h3>Here are all of your boards</h3>
            </div>
        </Header>
        <BoardsArea>
            {boards.map(board =>
                <Board>{board.name}</Board>
            )}
        </BoardsArea>
    </BoardsContainer>
}