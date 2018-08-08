import React from 'react'
import { SPRITE_SIZE } from '../../config/constants';
import { connect } from 'react-redux'

import './styles.css'

function getTileSprite(type) {
    switch(type) {
        case 0:
            return 'grass'
        case 2:
            return 'open-chest'
        case 3:
            return 'tree'
        case 4:
            return 'chest'
        case 5:
            return 'rock'
        case 6:
            return 'tree'
        default:
            return 'grass'
    }
}

function MapTile(props) {
    //console.log(props.tile);
    return (
        <div className={`tile ${getTileSprite(props.tile)}`}
            style={{
                height: SPRITE_SIZE,
                width: SPRITE_SIZE,
            }}
        />
    )
}

function MapRow(props) {
    return (
        <div className="row" 
            style={{
                height: SPRITE_SIZE,
            }}>
            { props.tiles.map(tile => <MapTile tile={tile} />) }
        </div> 
    ) 
}

function Map(props) {
    return (
        <div>
            { props.tiles.map(row => <MapRow tiles={row} />) }
        </div>
    )
}

function mapStateToProps(state) {
    return {
        tiles: state.map.tiles,
    }
}

function forceUpdateMap() {
     this.setState({ state: this.state });
}

export default connect(mapStateToProps)(Map)