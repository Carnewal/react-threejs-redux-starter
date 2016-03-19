import { connect } from 'react-redux'
import Simple from '../components/Simple'

import {rotateCube} from '../actions/cube'

const mapStateToProps = (state) => {
	return {
		cameraPosition: state.camera.position,
		cubeRotation: state.cube.rotation,
		width: window.innerWidth,
		height: window.innerHeight,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onAnimate: () => {
			console.log("On")
			dispatch(rotateCube())
		}
	}
}

const SimpleContainer = connect(mapStateToProps, mapDispatchToProps)(Simple)

export default SimpleContainer
