import Types from '../constants/actiontypes'
import THREE from 'three'

const camera = (
	state = {
		position: (new THREE.Vector3(0, 0, 5))
	}, action) => {

	switch(action.type) {
		//case Types.MOVE_CAMERA:
		default:
			return state
	}

}

export default camera