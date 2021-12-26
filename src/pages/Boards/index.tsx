import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import Actions from "../../components/Actions";
import { useBoards } from "../../contexts/boards";
import { addItemInLocalStorage } from "../../helpers/storage";
import { IBoard } from "../../schemas/board";
import { Board, BoardModal, BoardsArea, BoardsContainer, Header } from "./styles";
type TActions = {
    labelOption: string
    setContext: () => void
}

export default function Boards() {
    const { boards, setBoards } = useBoards()
    const [isModalOpened, setIsModalOpened] = useState(false)
    const [boardName, setBoardName] = useState('')
    const navigate = useNavigate()

    function handleSetBoards(storeBoards: IBoard[]) {
        setBoards([...storeBoards])
    }

    const chooseBoard = (currentId: string) => {
        boards.map((board: IBoard) => {
            board.id === currentId ? board.active = true : board.active = false
            return board
        })
        setBoards([...boards])
        navigate(`/project/${currentId}`)
    }


    const handleModal = () => setIsModalOpened(prev => prev ? false : true)

    const actions: TActions[] = [{
        labelOption: 'Add Board',
        setContext: handleModal
    }]

    const save = (key: string) => {
        const value = { id: uuidv4(), name: boardName, active: false }
        const storage = addItemInLocalStorage<IBoard>(key, value)
        handleSetBoards(storage)
    }
    // const deleteItem = (key: string, itemId: string) => removeItemFromLocalStorage<IBoard>(key, itemId)

    return <BoardsContainer>
        <BoardModal
            isOpen={isModalOpened}
            onRequestClose={handleModal}
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
            {boards.map(({ id, name }: IBoard) =>
                <Board onClick={() => chooseBoard(id)}>{name}</Board>
            )}
        </BoardsArea>
    </BoardsContainer>
}