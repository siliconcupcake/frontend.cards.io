import { socket } from '../util/socket-client'
import { gameActions } from './state/actions'

var startCoreGameEventListeners = (dispatch) => {
	const {
		createGameSuccess,
		createGameFailure,
		getPlayersListSuccess,
		getPlayersListFailure,
		joinGameSuccess,
		joinGameFailure,
		leaveGameSuccess,
		leaveGameFailure,
		startGameSuccess,
		startGameFailure,
		updateGame,
		updatePlayer,
		reconnectSuccess,
		reconnectFailure
	} = gameActions

	socket.on('game-probe', (response) => {
		console.log(response)
		if (response.code === 200) {
			dispatch(getPlayersListSuccess(response))
		} else {
			dispatch(getPlayersListFailure(response))
		}
	})
	socket.on('game-updates', (response) => {
		console.log(response)
		switch (response.type) {
			case 'CREATE':
				if (response.code === 200) dispatch(createGameSuccess(response))
				else dispatch(createGameFailure(response))
				break
			case 'JOIN':
				if (response.code === 200) dispatch(joinGameSuccess(response))
				else dispatch(joinGameFailure(response))
				break
			case 'LEAVE':
				if (response.code === 200) dispatch(leaveGameSuccess(response))
				else dispatch(leaveGameFailure(response))
				break
			case 'START':
				if (response.code === 200) dispatch(startGameSuccess())
				else dispatch(startGameFailure(response))
				break
			case 'CONNECT':
				if (response.code === 200) dispatch(reconnectSuccess(response))
				else dispatch(reconnectFailure(response))
				break
			default:
				break
		}
	})
	socket.on('game-data', (response) => {
		console.log(response)
		dispatch(updateGame(response.data))
	})
	socket.on('player-data', (response) => {
		console.log(response)
		dispatch(updatePlayer(response.data))
	})
}

export default startCoreGameEventListeners
