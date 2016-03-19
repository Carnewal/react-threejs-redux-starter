import Types from '../constants/actiontypes'
import THREE from 'three'

const cube = (state = {	rotation: new THREE.Euler() }, action) => {
	switch(action.type) {
		case Types.ROTATE_CUBE:
			return Object.assign({}, state, {
				rotation: new THREE.Euler(
          			state.rotation.x + 0.1,
          			state.rotation.y + 0.1,
          			0),
			})
		default:
			return state
	}
}

export default cube