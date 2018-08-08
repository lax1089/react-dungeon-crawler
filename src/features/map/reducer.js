const initialState = {
    tiles: [],
}

const mapReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'ADD_TILES':
            console.log('ADD_TILES:', action.payload.tiles)
            state.tiles = []
            return {
                ...action.payload
            }
        case 'PERFORM_ACTION':
            console.log('PERFORM_ACTION')
            return state
        default:
            return state
    }
}

export default mapReducer