import React, { createContext, ReactNode, useContext, useState } from "react";
import { getLocalStorage } from "../helpers/storage";
import { IBoard } from "../schemas/board";

const initialState: IBoard[] = getLocalStorage('boards')
type Props = {
    children: ReactNode
}
type BoardsState = {
    boards: IBoard[]
    setBoards: React.Dispatch<React.SetStateAction<IBoard[]>>
}

const BoardsContext = createContext<IBoard[] | any>([{}] as IBoard[])

export default function BoardsProvider({ children }: Props) {
    const [boards, setBoards] = useState<BoardsState[] | any>(initialState)
    return <BoardsContext.Provider value={{ boards, setBoards }}>
        {children}
    </BoardsContext.Provider>
}
export function useBoards() {
    const context = useContext(BoardsContext)
    const { boards, setBoards } = context
    return { boards, setBoards }
}