import store from '../../config/store'
import { SPRITE_SIZE, MAP_WIDTH, MAP_HEIGHT } from '../../config/constants'
import Map from '../map'


export default function handleMovement(player) {

    function getNewPosition(oldPos, direction) {
        switch(direction) {
            case 'WEST':
                return [ oldPos[0] - SPRITE_SIZE, oldPos[1] ]
            case 'EAST':
                return [ oldPos[0] + SPRITE_SIZE, oldPos[1] ]
            case 'SOUTH':
                return [ oldPos[0], oldPos[1] + SPRITE_SIZE ]
            case 'NORTH':
                return [ oldPos[0], oldPos[1] - SPRITE_SIZE ]
            default:
                return oldPos
        }
    }

    function getSpriteLocation(direction, walkIndex) {
        switch (direction) {
            case 'SOUTH':
                return `${SPRITE_SIZE*walkIndex}px ${SPRITE_SIZE*0}px`
            case 'EAST':
                return `${SPRITE_SIZE*walkIndex}px ${SPRITE_SIZE*1}px`
            case 'WEST':
                return `${SPRITE_SIZE*walkIndex}px ${SPRITE_SIZE*2}px`
            case 'NORTH':
                return `${SPRITE_SIZE*walkIndex}px ${SPRITE_SIZE*3}px`
            default:
                console.log('movement:getSpriteDirection - UNRECOGNIZED DIRECTION:', direction)
        }
    }

    function getWalkIndex() {
        const walkIndex = store.getState().player.walkIndex
        return walkIndex >= 7 ? 0 : walkIndex + 1
    }

    function observeBoundaries(oldPos, newPos) {
        return (newPos[0] >= 0 && newPos[0] <= MAP_WIDTH - SPRITE_SIZE) &&
               (newPos[1] >= 0 && newPos[1] <= MAP_HEIGHT - SPRITE_SIZE)
    }

    function observeImpassable(oldPos, newPos) {
        const tiles = store.getState().map.tiles
        const y = newPos[1] / SPRITE_SIZE
        const x = newPos[0] / SPRITE_SIZE
        const nextTile = tiles[y][x]
        return nextTile < 5
    }

    // getTilesPosition(pos) {
    //     const y = pos[1] / SPRITE_SIZE
    //     const x = pos[0] / SPRITE_SIZE
    //     return [{y}, {x}]
    // }

    function getCurrTile(pos) {
        const tiles = store.getState().map.tiles
        const y = pos[1] / SPRITE_SIZE
        const x = pos[0] / SPRITE_SIZE
        return tiles[y][x]
    }

    function isChestInProximity(currTile) {
        return currTile === 4
    }

    function dispatchAction(position, actionType) {
        store.dispatch({
            type: 'PERFORM_ACTION',
            payload: {
                position,
                actionType,
            }
        })
    }

    function attemptAction(actionType) {
        console.log('movement:attempAction - attempting action ', actionType)
        const pos = store.getState().player.position
        let currTile = getCurrTile(pos);

        const onChest = isChestInProximity(currTile)

        if (onChest) {
            console.log('movement:attempAction - I am on a chest at pos ', pos)
            console.log('tiles:', store.getState().map.tiles)
            console.log('currPos=', pos)
            const tiles = store.getState().map.tiles
            const y = pos[1] / SPRITE_SIZE
            const x = pos[0] / SPRITE_SIZE
            tiles[y][x] = 2
            store.dispatch({ type: 'ADD_TILES', payload: { 
                tiles, }
            })
            store.getState().map
        }
        //dispatchAction(pos, actionType)
    }

    function dispatchMove(newPos, direction) {
        const walkIndex = getWalkIndex()
        store.dispatch({
            type: 'MOVE_PLAYER',
            payload: {
                position: newPos,
                direction,
                walkIndex,
                spriteLocation: getSpriteLocation(direction, walkIndex),
            }
        })
    }

    function attemptMove(direction) {
        const oldPos = store.getState().player.position
        const newPos = getNewPosition(oldPos, direction)

        if (observeBoundaries(oldPos, newPos) && observeImpassable(oldPos, newPos)) {
            dispatchMove(newPos, direction)
        }
    }

    function handleKeyDown(e) {
        e.preventDefault()
        switch(e.keyCode) {
            case 13:
                return attemptAction('OPEN')
            case 37:
                return attemptMove('WEST')
            case 38:
                return attemptMove('NORTH')
            case 39:
                return attemptMove('EAST')
            case 40:
                return attemptMove('SOUTH')
            default:
                console.log('movement:handleKeyDown - UNMAPPED KEY:', e.keyCode)
        }
    }

    window.addEventListener('keydown', (e) => {
        handleKeyDown(e)
    })

    return player
}