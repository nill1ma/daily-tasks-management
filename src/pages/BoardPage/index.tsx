import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import Actions from "../../components/Actions";
import Column from "../../components/Column";
import { GenericModal } from "../../components/GenericModal";
import { useBoards } from "../../contexts/boards";
import { useCards } from "../../contexts/cards";
import { useColumns } from "../../contexts/columns";
import { addItemInLocalStorage, getLocalStorage, removeItemFromLocalStorage } from "../../helpers/storage";
import { TActions } from "../../schemas/actions";
import { CardPriority, ICard, mountPriotity } from "../../schemas/card";
import { ICoolumn } from "../../schemas/column";
import { BoardContainer, ColumnsArea, Header } from "./styles";

export default function BoardPage() {

    const { boards } = useBoards()
    const { columns, setColumns } = useColumns()
    const { setCards } = useCards()
    const [isModalOpened, setIsModalOpened] = useState(false)
    const [label, setLabel] = useState('')
    const [description, seDescription] = useState('')
    const [cardAPriority, setCardAPriority] = useState<CardPriority>({} as CardPriority)
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

    function filterByCards(filter: string) {
        const storage = getLocalStorage('cards')
        const filteredCards = storage.filter((card: ICard) => card.label.includes(filter))
        setCards(filteredCards.length > 0 ? filteredCards : storage)
    }

    const save = (key: string) => {
        const id = uuidv4()
        const value = { id, label, ...getRestColumnOrCardObject(key) }
        const storage = addItemInLocalStorage<ICard | ICoolumn>(key, value)
        'columns' === key ? setColumns([...storage]) : setCards([...storage])
        setIsModalOpened(prev => !prev)
    }

    const getRestColumnOrCardObject = (key: string) => 'columns' === key ? { boardId: boardSession.id } : { description, priority: cardAPriority, columnId: currentColumnId }
    const removeColumn = (columnId: string) => {
        const updatedeColumns = removeItemFromLocalStorage('columns', columnId)
        setColumns([...updatedeColumns])
    }
    const handleCardAPriority = (e: any) => {
        const { value } = e.target
        setCardAPriority!(mountPriotity(value))
    }

    return <BoardContainer>
        <GenericModal
            label={`Add a new Column`}
            isModalOpened={isModalOpened}
            handleModal={handleModal}
            setLabelOf={setLabel}
            save={save}
            storageKey={storageKey}
            seDescription={seDescription}
            handleCardAPriority={handleCardAPriority}
        />
        <Header>
            <Actions actions={actions} filterAction={filterByCards} findBy="Card" />
            <div className="projetName">
                <h3>{boardSession.name}</h3>
            </div>
        </Header>
        <ColumnsArea>
            {(columns && columns.length > 0) &&columns.filter(({ boardId }: ICoolumn) => boardId === boardSession.id)
                .map(({ id, label }: ICoolumn) =>
                    <Column key={id}
                        columnId={id}
                        label={label}
                        handleModal={handleModal}
                        removeColumn={removeColumn} />
                )}
        </ColumnsArea>
    </BoardContainer>
}