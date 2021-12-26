import Actions from "../../components/Actions";
import { useBoards } from "../../contexts/boards";
import { v4 as uuidv4 } from 'uuid';
import { addItemInLocalStorage, removeItemFromLocalStorage } from "../../helpers/storage";
import { IBoard } from "../../schemas/board";
import { Board, BoardModal, BoardsArea, BoardsContainer, Header } from "./styles";
import { useState } from "react";
type TActions = {
    labelOption: string
    setContext: () => void
}

export default function Boards() {
    const { boards, setBoards } = useBoards()
    const [isModalOpened, setIsModalOpened] = useState(false)
    const [boardName, setBoardName] = useState('')

    function handleSetBoards(storeBoards: IBoard[]) {
        setBoards([...storeBoards])
    }

    const handle = () => setIsModalOpened(prev => prev ? false : true)

    const actions: TActions[] = [{
        labelOption: 'Add Board',
        setContext: handle
    }]

    const save = (key: string) => {
        const value = { id: uuidv4(), name: boardName }
        const storage = addItemInLocalStorage<IBoard>(key, value)
        handleSetBoards(storage)
    }
    // const deleteItem = (key: string, itemId: string) => removeItemFromLocalStorage<IBoard>(key, itemId)

    return <BoardsContainer>
        <BoardModal
            isOpen={isModalOpened}
            onRequestClose={handle}
            style={{
                overlay: {
                    border: '5px solid #fff',
                    width: '50vw',
                    margin: 'auto',
                    opacity: '100%',
                    height: '50vh',
                    borderRadius: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                },
                content: {
                    background: '#161b22',
                    overflow: "auto",
                    WebkitOverflowScrolling: "touch",
                    borderRadius: "4px",
                    outline: "none",
                    border: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: '#fff',
                    height: '50vh',
                }
            }}
        >
            <input type={'text'} onChange={(e) => setBoardName(e.target.value)} />
            <button
                onClick={() => save('boards')}
                style={
                    {
                        padding: '10px',
                        cursor: 'pointer', marginTop: '10px'
                    }}>Save</button>

        </BoardModal>
        <Header>
            <Actions actions={actions} findBy="Card" />
            <div className="projetName">
                <h3>Here are all of your boards</h3>
            </div>
        </Header>
        <BoardsArea>
            {boards.map((board: IBoard) =>
                <Board to={`project/${board.id}`}>{board.name}</Board>
            )}
        </BoardsArea>
    </BoardsContainer>
}