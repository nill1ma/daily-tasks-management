import { useEffect, useState } from "react";
import Actions from "../../components/Actions";
import Column from "../../components/Column";
import { useCards } from "../../contexts/cards";
import { useColumns } from "../../contexts/columns";
import { v4 as uuidv4 } from 'uuid';
import { addItemInLocalStorage } from "../../helpers/storage";
import { ICoolumn } from "../../schemas/column";
import { BoardContainer, ColumndModal, ColumnsArea, Header } from "./styles";
import { useStore } from "react-redux";
type TActions = {
    labelOption: string
    setContext: () => void
}

export default function Board() {

    // const { cards, setCards } = useCards()
    const { columns, setColumns } = useColumns()

    function handleCards() {
        console.log('Working')
    }

    const actions: TActions[] = [
        { labelOption: 'Add Card', setContext: handleCards }
        // {labelOption:'Add Column'}
    ]


    const [isModalOpened, setIsModalOpened] = useState(false)
    const [boardName, setBoardName] = useState('')

    function handleSetColumns(storeColumns: ICoolumn[]) {
        setColumns([...storeColumns])
    }

    const [boardId, setBoardId] = useState('')

    useEffect(() => {
        const url = window.location.href.split('/')
        setBoardId(url[url.length - 1])
    }, [columns])

    const handle = () => setIsModalOpened(prev => prev ? false : true)

    const save = (key: string) => {
        const value = { id: uuidv4(), columnName: boardName, boardId }
        const storage = addItemInLocalStorage<ICoolumn>(key, value)
        handleSetColumns(storage)
    }

    return <BoardContainer>
        <ColumndModal
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
                onClick={() => save('columns')}
                style={
                    {
                        padding: '10px',
                        cursor: 'pointer', marginTop: '10px'
                    }}>Save</button>

        </ColumndModal>
        <Header>
            <Actions actions={actions} findBy="Card" />
            <div className="projetName">
                <h3>Daily tasks management</h3>
            </div>
        </Header>
        <ColumnsArea>
            {columns.map((column: ICoolumn) =>
                <Column key={column.id} columnId={column.id} columnName={column.columnName} />
            )}
        </ColumnsArea>
    </BoardContainer>
}