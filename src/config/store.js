import { createStore, combineReducers } from 'redux'
import playerReducer from '../features/player/reducer.js'
import mapReducer from '../features/map/reducer.js'
import { devToolsEnhancer } from 'redux-devtools-extension';

const rootReducer = combineReducers({
    player: playerReducer,
    map: mapReducer,
})

const store = createStore(
    rootReducer,
    // window.__REDUX_DEVTOOLS_EXTENSION && window.__REDUX_DEVTOOLS_EXTENSION__(),
    devToolsEnhancer()
)

export default store