
const INITIAL_STATE = {
    data: [
        {
            name: '',
            date: '',
            time: ''
        }
    ]
}
type Action = {
    type:string
    updated:boolean[]
}

function columns(state = INITIAL_STATE, action:Action) {
    switch (action.type) {
        case "UPDATE_HISTORY":
            return { ...state, data: [...action.updated] };
        default:
            return state;
    }
}

export { columns };
