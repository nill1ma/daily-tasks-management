import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import Actions from "../../components/Actions";
import Column from "../../components/Column";
import { GenericModal } from "../../components/GenericModal";
import { useBoards } from "../../contexts/boards";
import { useCards } from "../../contexts/cards";
import { useColumns } from "../../contexts/columns";
import { addItemInLocalStorage, getLocalStorage, removeItemFromLocalStorage } from "../../helpers/storage";
import { hasElementInArray } from "../../helpers/validations";
import { TActions } from "../../schemas/actions";
import { CardPriority, ICard } from "../../schemas/card";
import { ICoolumn } from "../../schemas/column";
import { ColumnsState } from "../../schemas/stores/columns-state";
import { addColumn, deleteColumn } from "../../store/actions";
import { RootState } from "../../store/reducers";
import { BoardContainer, ColumnsArea, Header } from "./styles";

export default function BoardPage() {

    const { boards } = useBoards()
    // const { columns, setColumns } = useColumns()
    const dispatch = useDispatch()
    const columns: ICoolumn[] = useSelector(({ columns: { data } }: RootState) => data)
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
        setCards(hasElementInArray(filteredCards) ? filteredCards : storage)
    }

    const save = (key: string) => {
        const id = uuidv4()
        const { id: boardId } = boardSession
        const value = { id, label, boardId }
        dispatch(addColumn(value))
        // const storage = addItemInLocalStorage<ICard | ICoolumn>(key, value)


        // 'columns' === key ? setColumns([...storage]) : setCards([...storage])
        setIsModalOpened(prev => !prev)
    }

    const getRestColumnOrCardObject = (key: string) => 'columns' === key ? { boardId: boardSession.id } : { description, priority: cardAPriority, columnId: currentColumnId }
    const removeColumn = (column: ICoolumn) => {
        // const updatedeColumns = removeItemFromLocalStorage('columns', columnId)
        // setColumns([...updatedeColumns])
        dispatch(deleteColumn(column))
    }
    const handleCardAPriority = (e: any) => {
        const { value } = e.target
        setCardAPriority!(JSON.parse(value))
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
            {(hasElementInArray(columns)) && columns.filter(({ boardId }: ICoolumn) => boardId === boardSession.id)
                .map((column: ICoolumn) =>
                    <Column key={column.id}
                        column={column}
                        handleModal={handleModal}
                        removeColumn={removeColumn} />
                )}
        </ColumnsArea>
    </BoardContainer>
}