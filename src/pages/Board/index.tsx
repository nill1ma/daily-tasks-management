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

    const { boards } = useBoards()
    const { columns, setColumns } = useColumns()
    const { setCards } = useCards()
    const [isModalOpened, setIsModalOpened] = useState(false)
    const [label, setLabel] = useState('')
    const [cardDescription, setCardDescription] = useState('')
    const [boardSession, setBoardSession] = useState({ id: '', name: '' })
    const [currentColumnId, setCurrentColumnId] = useState('')
    const [storageKey, setStorageKey] = useState('')

    useEffect(() => {
        const { id, name } = getLocalStorage('currentBoard')
        setBoardSession({ id, name })
    }, [boards])

    const handleModal = (isItCard?: boolean, columnId?: string) => {
        setIsModalOpened(prev => prev ? false : true)
        if (isItCard) {
            setCurrentColumnId(columnId!)
            setStorageKey('cards')
            return
        }
        setStorageKey('columns')
    }

    const actions: TActions[] = [
        { labelOption: 'Add Column', handleModal: handleModal, icon: faPlus }
    ]

    const save = (key: string) => {
        const id = uuidv4()
        if ('columns' === key) {
            const value = { id, columnName: label, boardId: boardSession.id }
            const storage = addItemInLocalStorage<ICoolumn>(key, value)
            setColumns([...storage])
        } else if ('cards' === key) {
            const value = { id, title: label, description: cardDescription, columnId: currentColumnId }
            const storage = addItemInLocalStorage<ICard>(key, value)
            setCards([...storage])
        }
    }

    return <BoardContainer>
        <GenericModal
            isModalOpened={isModalOpened}
            handleModal={handleModal}
            setLabelOf={setLabel}
            save={save}
            storageKey={storageKey}
            setDescription={setCardDescription}
        />
        <Header>
            <Actions actions={actions} findBy="Card" />
            <div className="projetName">
                <h3>{boardSession.name}</h3>
            </div>
        </Header>
        <ColumnsArea>
            {columns.filter(({ boardId }: ICoolumn) => boardId === boardSession.id)
                .map(({ id, columnName }: ICoolumn) =>
                    <Column key={id}
                        columnId={id}
                        columnName={columnName}
                        handleModal={handleModal} />
                )}
        </ColumnsArea>
    </BoardContainer>
}