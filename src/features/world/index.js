import React from 'react'
import Player from '../player'
import Map from '../map'
import store from '../../config/store'

import { tiles } from '../../data/maps/1'
import { MAP_HEIGHT, MAP_WIDTH } from '../../config/constants';

function World(props) {
    store.dispatch({ type: 'ADD_TILES', payload: { 
        tiles, }
    })
    return (
        <div
            style={{
                position: 'relative',
                width: `${MAP_WIDTH}px`,
                height: `${MAP_HEIGHT}px`,
                margin: '20px auto',
                border: '6px solid white',
            }}
        >
            <Map />
            <Player />
        </div>
    )
}

export default World