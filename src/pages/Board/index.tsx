import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import Actions from "../../components/Actions";
import Column from "../../components/Column";
import { useBoards } from "../../contexts/boards";
import { useColumns } from "../../contexts/columns";
import { addItemInLocalStorage } from "../../helpers/storage";
import { IBoard } from "../../schemas/board";
import { ICoolumn } from "../../schemas/column";
import { BoardContainer, ColumndModal, ColumnsArea, Header } from "./styles";
type TActions = {
    labelOption: string
    setContext: () => void
}

export default function Board() {

    const { columns, setColumns } = useColumns()
    const { boards, setBoards } = useBoards()
    const [boardSession, setBoardSession] = useState({} as IBoard)

    function handleCards() {
        console.log('Working')
    }

    useEffect(() => {
        const { active, ...board } = boards.find((board: IBoard) => board.active)
        setBoardSession({ ...board })
    }, [boards])

    const [isModalOpened, setIsModalOpened] = useState(false)
    const [columnName, setColumnName] = useState('')

    function handleSetColumns(storeColumns: ICoolumn[]) {
        setColumns([...storeColumns])
    }

    const handleModal = () => setIsModalOpened(prev => prev ? false : true)

    const actions: TActions[] = [
        { labelOption: 'Add Card', setContext: handleCards },
        { labelOption: 'Add Column', setContext: handleModal }
    ]

    useEffect(() => {
        console.log('boards updated')
        console.log(boards)
    }, [])

    const save = (key: string) => {
        const value = { id: uuidv4(), columnName: columnName, boardId: boardSession.id }
        const storage = addItemInLocalStorage<ICoolumn>(key, value)
        handleSetColumns(storage)
    }

    return <BoardContainer>
        <ColumndModal
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
            <input type={'text'} onChange={(e) => setColumnName(e.target.value)} />
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
                <h3>{boardSession.name}</h3>
            </div>
        </Header>
        <ColumnsArea>
            {columns.filter((column: ICoolumn) => column.boardId === boardSession.id)
                .map((column: ICoolumn) =>
                    <Column key={column.id}
                        columnId={column.id}
                        columnName={column.columnName} />
                )}
        </ColumnsArea>
    </BoardContainer>
}