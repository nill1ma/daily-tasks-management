import { IBoard } from "../schemas/board"
import { ICard } from "../schemas/card"
import { ICoolumn } from "../schemas/column"

type TGenericStorage = IBoard | ICard | ICoolumn

function getLocalStorage(key: string) {
    return JSON.parse(localStorage.getItem(key)! || '[]')
}

function addItemInLocalStorage<T>(key: string, value: TGenericStorage): T[] {
    const storage = getLocalStorage(key)
    switch (key) {
        case 'currentBoard':
            localStorage.setItem(key, JSON.stringify({ ...value }))
            break;
        default:
            localStorage.setItem(key, JSON.stringify([...storage, value]))
            break;
    }
    return getLocalStorage(key)
}

function updateItemInLocalStorage<T>(key: string, storage: TGenericStorage[]): T[] {
    localStorage.setItem(key, JSON.stringify([...storage]))
    return getLocalStorage(key)
}

function removeItemFromLocalStorage<T>(key: string, itemId: string): T[] {
    const storage = getLocalStorage(key)
    const updatedStorage = storage.filter((item: TGenericStorage) => item.id !== itemId)
    localStorage.setItem(key, JSON.stringify([...updatedStorage]))
    'boards' === key && removeColumnsByBoardId(itemId)
    'columns' === key && removeCardsByColumnId([itemId])
    return getLocalStorage(key)
}

function removeColumnsByBoardId(boardId: string) {
    const storage = getLocalStorage('columns')
    const updatedStorage = storage.filter((item: ICoolumn) => item.boardId !== boardId)
    const ids = updatedStorage.map((item: ICoolumn) => item.id)
    removeCardsByColumnId([...ids])
    localStorage.setItem('columns', JSON.stringify([...updatedStorage]))
    return getLocalStorage('columns')
}

function removeCardsByColumnId(columnsIds: string[]) {
    const storage = getLocalStorage('cards')
    var updatedStorage:ICard[] = []
    if(columnsIds.length > 0){
        updatedStorage = storage.filter((item: ICard) => !columnsIds.includes(item.columnId))
    }
    localStorage.setItem('cards', JSON.stringify([...updatedStorage]))
}

export {
    getLocalStorage,
    addItemInLocalStorage,
    updateItemInLocalStorage,
    removeItemFromLocalStorage
}