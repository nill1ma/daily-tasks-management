import { faPlus, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import Actions from "../../components/Actions";
import Column from "../../components/Column";
import GenericModal from "../../components/GenericModal";
import { useBoards } from "../../contexts/boards";
import { useCards } from "../../contexts/cards";
import { useColumns } from "../../contexts/columns";
import { addItemInLocalStorage, getLocalStorage } from "../../helpers/storage";
import { ICard } from "../../schemas/card";
import { ICoolumn } from "../../schemas/column";
import { BoardContainer, ColumnsArea, Header } from "./styles";
type TActions = {
    labelOption: string
    handleModal: (isItCard?: boolean) => void
    icon: IconDefinition
}

export default function Board() {

    const { columns, setColumns } = useColumns()
    const { cards, setCards } = useCards()
    const { boards } = useBoards()
    const [isModalOpened, setIsModalOpened] = useState(false)
    const [columnName, setColumnName] = useState('')
    const [boardSession, setBoardSession] = useState({ id: '', name: '' })
    const [storageKey, setStorageKey] = useState('')

    useEffect(() => {
        const { id, name } = getLocalStorage('currentBoard')
        setBoardSession({ id, name })
    }, [boards])

    function handleSetColumns(storeColumns: ICoolumn[]) {
        setColumns([...storeColumns])
    }

    const handleModal = (isItCard?: boolean) => {
        setIsModalOpened(prev => prev ? false : true)
        isItCard ? setStorageKey('cards') : setStorageKey('')
    }

    const actions: TActions[] = [
        { labelOption: 'Add Column', handleModal: handleModal, icon: faPlus }
    ]

    const save = (key: string) => {
        if ('columns' === key) {
            const value = { id: uuidv4(), columnName: columnName, boardId: boardSession.id }
            const storage = addItemInLocalStorage<ICoolumn>(key, value)
            setColumns([...storage])
        }
    }

    return <BoardContainer>
        <GenericModal
            isModalOpened={isModalOpened}
            handleModal={handleModal}
            setNameOf={setColumnName}
            save={save}
            storageKey={storageKey}
        />
        <Header>
            <Actions actions={actions} findBy="Card" />
            <div className="projetName">
                <h3>{boardSession.name}</h3>
            </div>
        </Header>
        <ColumnsArea>
            {columns.filter((column: ICoolumn) => column.boardId === boardSession.id)
                .map((column: ICoolumn) =>
                    <Column key={column.id}
                        columnId={column.id}
                        columnName={column.columnName}
                        handleModal={handleModal} />
                )}
        </ColumnsArea>
    </BoardContainer>
}