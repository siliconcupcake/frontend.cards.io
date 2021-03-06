import { gameConstants } from '../actions'

const initialState = {}

export function game(state = initialState, action) {
	switch (action.type) {
		case gameConstants.CREATE_GAME_REQUEST:
			return {
				...state,
				error: null,
				locked: true
			}
		case gameConstants.CREATE_GAME_SUCCESS:
			return {
				...state,
				gameData: {
					code: action.data.gcode,
					players: [
						{
							name: action.data.pname,
							position: 1
						}
					]
				},
				playerData: {
					id: action.data.pid,
					name: action.data.pname,
					position: 1
				},
				locked: false,
				inGame: true
			}
		case gameConstants.CREATE_GAME_FAILURE:
			return {
				...state,
				error: {
					code: action.data.code,
					message: action.data.message
				},
				locked: false
			}
		case gameConstants.GET_PLAYERS_LIST_REQUEST:
			return {
				...state,
				error: null,
				locked: true
			}
		case gameConstants.GET_PLAYERS_LIST_SUCCESS:
			return {
				...state,
				gameData: {
					...state.gameData,
					players: action.data.data
				},
				locked: false
			}
		case gameConstants.GET_PLAYERS_LIST_FAILURE:
			return {
				...state,
				error: {
					code: action.data.code,
					message: action.data.message
				},
				locked: false
			}
		case gameConstants.JOIN_GAME_REQUEST:
			return {
				...state,
				error: null,
				gameData: {
					...state.gameData,
					code: action.data.gameCode
				},
				playerData: {
					name: action.data.name,
					position: action.data.position
				},
				locked: true
			}
		case gameConstants.JOIN_GAME_SUCCESS:
			return {
				...state,
				gameData: {
					...state.gameData,
					players: action.data.data
				},
				locked: false,
				inGame: true
			}
		case gameConstants.JOIN_GAME_FAILURE:
			return {
				...state,
				playerData: {},
				error: {
					code: action.data.code,
					message: action.data.message
				},
				locked: false,
				inGame: false
			}
		case gameConstants.LEAVE_GAME_REQUEST:
			return {
				...state,
				error: null,
				locked: true
			}
		case gameConstants.LEAVE_GAME_SUCCESS:
			return {
				...state,
				gameData: {
					players: []
				},
				locked: false,
				inGame: false
			}
		case gameConstants.LEAVE_GAME_FAILURE:
			return {
				...state,
				error: {
					code: action.data.code,
					message: action.data.message
				},
				locked: false
			}
		case gameConstants.START_GAME_REQUEST:
			return {
				...state,
				error: null,
				locked: true
			}
		case gameConstants.START_GAME_SUCCESS:
			return {
				...state,
				locked: false
			}
		case gameConstants.START_GAME_FAILURE:
			return {
				...state,
				error: {
					code: action.data.code,
					message: action.data.message
				},
				locked: false
			}
		case gameConstants.UPDATE_GAME:
			return {
				...state,
				gameData: action.data,
				locked: false
			}
		case gameConstants.UPDATE_PLAYER:
			return {
				...state,
				playerData: action.data,
				locked: false
			}
		case gameConstants.DESTROY_GAME_REQUEST:
			return {
				...state,
				gameData: {
					players: []
				},
				inGame: false
			}
		case gameConstants.CARD_SELECTED: {
			return {
				...state,
				cardSelected: action.data
			}
		}
		case gameConstants.RECONNECT_SUCCESS:
			return {
				...state,
				error: null,
				playerData: action.data.player,
				gameData: action.data.game,
				inGame: true
			}
		case gameConstants.RECONNECT_FAILURE:
			return {
				...state,
				error: {
					code: action.data.code,
					message: action.data.message
				}
			}
		case gameConstants.ADD_CARD: {
			let prev = JSON.parse(JSON.stringify(state))
			if (action.data.fromPos === state.playerData.position)
				prev.playerData.hand.splice(
					prev.playerData.hand.indexOf(action.data.card),
					1
				)
			prev.gameData.players = prev.gameData.players.map((player) => {
				if (player.position === action.data.fromPos) player.count--
				else if (player.position === action.data.toPos) player.count++
				return player
			})
			return prev
		}
		default:
			return state
	}
}
