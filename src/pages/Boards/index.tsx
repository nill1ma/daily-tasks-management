import { faFolderPlus, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import Actions from "../../components/Actions";
import GenericModal from "../../components/GenericModal";
import { useBoards } from "../../contexts/boards";
import { addItemInLocalStorage } from "../../helpers/storage";
import { IBoard } from "../../schemas/board";
import { Board, BoardsArea, BoardsContainer, Header } from "./styles";
type TActions = {
    labelOption: string
    handleModal: () => void
    icon: IconDefinition
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
        handleSetBoards(storage)
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