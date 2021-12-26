import React, { createContext, ReactNode, useContext, useState } from "react";
import { getLocalStorage } from "../helpers/storage";
import { ICoolumn } from "../schemas/column";

const initialState: ICoolumn[] = getLocalStorage('columns')
type Props = {
    children: ReactNode
}

type TColumnsState = {
    columns: ICoolumn[]
    setColumns: React.Dispatch<React.SetStateAction<ICoolumn[] | any>>
}

const ColumnsContext = createContext<ICoolumn[] | any>([{}] as ICoolumn[])

export default function Columnsrovider({ children }: Props) {

    const [columns, setColumns] = useState<TColumnsState[] | any>(initialState)
    return <ColumnsContext.Provider value={{ columns, setColumns }}>
        {children}
    </ColumnsContext.Provider>
}

export function useColumns() {
    const context = useContext(ColumnsContext)
    const { columns, setColumns } = context
    return { columns, setColumns }
}