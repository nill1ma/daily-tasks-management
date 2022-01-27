export interface ICard {
    [key: string]: any,
    id: string
    label: string
    columnId: string
    description?: string
    priority: CardPriority
}

export const mountPriotity = (reference: string) => {
    const [description, code] = reference.split('_')
    return {
        description,
        code: Number(code)
    }
}

export interface CardPriority{
    description?: string
    code: number
}

export enum PriorityReferences {
    HIGH_0 = 'HIGH_0',
    MEDIUM_1 = 'MEDIUM_1',
    LOW_2 = 'LOW_2'
}