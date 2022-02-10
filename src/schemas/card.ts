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

export interface CardPriority {
    description: string
    code: number
}

export const PriorityReferences: CardPriority[] = [
    { description: 'HIGH', code: 0 },
    { description: 'MEDIUM', code: 1 },
    { description: 'LOW', code: 2 },
]
