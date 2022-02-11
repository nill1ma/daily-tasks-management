export interface ICard {
    [key: string]: string | CardPriority | undefined,
    id: string
    label: string
    columnId: string
    description?: string
    priority: CardPriority
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
