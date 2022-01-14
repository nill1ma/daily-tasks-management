import { IBoard } from "../schemas/board"
import { ICard } from "../schemas/card"
import { ICoolumn } from "../schemas/column"

type TGenericStorage = IBoard | ICard | ICoolumn

function getLocalStorage(key: string) {
    return storageJsonParse(key)
}

function addItemInLocalStorage<T>(key: string, value: TGenericStorage): T[] {
    const storage = storageJsonParse(key)
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
    const storage = storageJsonParse(key)
    const updatedStorage = storage.filter((item: TGenericStorage) => item.id !== itemId)
    localStorage.setItem(key, JSON.stringify([...JSON.parse(updatedStorage)]))
    return getLocalStorage(key)
}

const storageJsonParse = (key: string) => JSON.parse(localStorage.getItem(key)! || '[]')

export {
    getLocalStorage,
    addItemInLocalStorage,
    updateItemInLocalStorage,
    removeItemFromLocalStorage
}