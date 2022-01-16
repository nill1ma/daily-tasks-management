import { useState } from "react";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { GenericModal } from "../../components/GenericModal";
import { useBoards } from "../../contexts/boards";
import { addItemInLocalStorage, getLocalStorage, removeItemFromLocalStorage } from "../../helpers/storage";
import { TActions } from "../../schemas/actions";
import { IBoard } from "../../schemas/board";
import { BoardsArea, BoardsContainer, Header } from "./styles";
import Actions from "../../components/Actions";
import Board from "../../components/Board";

export default function Boards() {
    const { boards, setBoards } = useBoards()
    const [isModalOpened, setIsModalOpened] = useState(false)
    const [boardName, setBoardName] = useState('')
    const navigate = useNavigate()

    const chooseBoard = (currentId: string) => {
        const index = boards.findIndex((board: IBoard) => board.id === currentId)
        const { id, name } = boards[index]
        addItemInLocalStorage('currentBoard', { id, name })
        navigate(`/project/${currentId}`)
    }

    const handleModal = () => setIsModalOpened(prev => prev ? false : true)

    const actions: TActions[] = [{
        labelOption: 'Add Board',
        handleModal: handleModal,
        icon: faFolderPlus
    }]

    const save = (key: string) => {
        const value = { id: uuidv4(), name: boardName, active: false }
        const storage = addItemInLocalStorage<IBoard>(key, value)
        setBoards([...storage])
    }

    function filterByBoards(filter: string) {
        const storage = getLocalStorage('boards')
        const filteredBoards = storage.filter((board: IBoard) => board.name.includes(filter))
        setBoards(filteredBoards.length > 0 ? filteredBoards : storage)
    }
    const removeBoard = (boardId: string) => {
        const updatedeBoards = removeItemFromLocalStorage('boards', boardId)
        setBoards([...updatedeBoards])
    }

    return <BoardsContainer>
        <GenericModal
            isModalOpened={isModalOpened}
            handleModal={handleModal}
            setLabelOf={setBoardName}
            save={save}
            storageKey={'boards'}
        />
        <Header>
            <Actions actions={actions} filterAction={filterByBoards} findBy="Card" />
            <div className="projetName">
                <h3>Here are all of your boards</h3>
            </div>
        </Header>
        <BoardsArea>
            {boards.map((board: IBoard) =>
                <Board key={board.id} project={board} chooseBoard={chooseBoard} removeBoard={removeBoard} />
            )}
        </BoardsArea>
    </BoardsContainer>
}