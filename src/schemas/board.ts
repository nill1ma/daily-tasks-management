export interface IBoard {
    [key: string]: string | boolean | undefined,
    id: string,
    name: string
    active?:boolean
}