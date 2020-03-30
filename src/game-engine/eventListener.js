import socket from '../util/socket-client'
import { gameActions } from './state/actions'

var startCoreGameEventListeners = (dispatch) => {
	const {
		createGameSuccess,
		createGameFailure,
		getPlayersListSuccess,
		joinGameSuccess,
		joinGameFailure,
		leaveGameFailure,
		addPlayer,
		startGameSuccess,
		startGameFailure,
		updateGame,
		updatePlayer
	} = gameActions

	socket.on('game-probe', (response) => {
		if (response.code === 200) {
			dispatch(getPlayersListSuccess(response.data))
		}
	})
	socket.on('game-updates', (response) => {
		switch (response.type) {
			case 'CREATE':
				if (response.code === 200) dispatch(createGameSuccess(response))
				else dispatch(createGameFailure(response))
				break
			case 'LIST':
				if (response.code === 200) dispatch(joinGameSuccess(response))
				else dispatch(joinGameFailure(response))
				break
			case 'JOIN':
				if (response.code === 200)
					dispatch(addPlayer(response.pname, response.position))
				break
			case 'LEAVE':
				if (response.code !== 200) dispatch(leaveGameFailure(response))
				break
			case 'START':
				if (response.code === 200) dispatch(startGameSuccess())
				else dispatch(startGameFailure(response))
				break
			case 'GAME':
				dispatch(updateGame(response.data))
				break
			default:
				break
		}
	})
	socket.on('player-updates', (response) => {
		dispatch(updatePlayer(response.data))
	})
}

export default startCoreGameEventListeners