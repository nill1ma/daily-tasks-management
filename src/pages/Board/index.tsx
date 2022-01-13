import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { DragEvent, useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import Actions from "../../components/Actions";
import Column from "../../components/Column";
import GenericModal from "../../components/GenericModal";
import { useBoards } from "../../contexts/boards";
import { useCards } from "../../contexts/cards";
import { useColumns } from "../../contexts/columns";
import { addItemInLocalStorage, getLocalStorage } from "../../helpers/storage";
import { TActions } from "../../schemas/actions";
import { ICard } from "../../schemas/card";
import { ICoolumn } from "../../schemas/column";
import { BoardContainer, ColumnsArea, Header } from "./styles";

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
        const value = { id, label, ...getRestColumnOrCardObject(key) }
        const storage = addItemInLocalStorage<ICard | ICoolumn>(key, value)
        'columns' === key ? setColumns([...storage]) : setCards([...storage])
    }

    const getRestColumnOrCardObject = (key: string) => 'columns' === key ? { boardId: boardSession.id } : { description: cardDescription, columnId: currentColumnId }

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
                .map(({ id, label }: ICoolumn) =>
                    <Column key={id}
                        columnId={id}
                        label={label}
                        handleModal={handleModal} />
                )}
        </ColumnsArea>
    </BoardContainer>
}