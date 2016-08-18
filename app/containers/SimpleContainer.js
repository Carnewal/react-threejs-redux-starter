import { connect } from 'react-redux'
import Simple from '../components/Simple'
import React3 from 'react-three-renderer'
import THREE from 'three'
// import Selectors from '../selectors'
import { ctrlConnected, ctrlDisconnected } from '../actions/controller'
import { onAnimate } from '../actions/world'

const timeStep = 1/60


/* const calculateViews = (views) => {
	for (var ii =  0; ii < views.length; ++ii ) {
		var view = views[ii];
		var divider = views.length == 1 ? 1 : (2 + Math.floor(views.length / 9));
		camera = new THREE.PerspectiveCamera( view.fov,  (1 / Math.ceil(views.length / divider) ) / window.innerHeight, 1, 10000 );
		camera.position.x = view.eye[ 0 ];
		camera.position.y = view.eye[ 1 ];
		camera.position.z = view.eye[ 2 ];
		view.camera = camera;

		view.left   = Math.floor( window.innerWidth  * (Math.floor(ii / divider) / Math.ceil(views.length/divider)));
		view.bottom = Math.floor( window.innerHeight * ((ii % divider) / divider) );
		view.width  = Math.floor( window.innerWidth  * 1 / Math.ceil(views.length / divider) ) // - 1; // - 1 for border
		view.height = Math.floor( window.innerHeight * (1/divider) ) // - 1; // -1 for border
		views[ii] = view
	}
} */

/*

const getPlayers = (state) => {

	const players = state.world.players

	return Object.keys(state.controllers.collection).map((id) => {
		const controller = state.controllers.collection[id]
		return {
			_viewport: {
				key: id,
				x: 0,
				y: 0,
				width: 1920,
				height: 1080
			},
			_camera: {
				id: id,
				position: new THREE.Vector3(10, 2, 0)
			}
		}
	})

}
*/

const getViewPorts = (width, height) => {
	return [
		{
			key: 'vp1',
			x: 0,
			y: 0,
			width: ((width / 2) - 1),
			height: (height / 2),
			cameraName: 'camera1'
		},
		{
			key: 'vp2',
			x: (width / 2),
			y: 0,
			width: ((width / 2) - 1),
			height: (height / 2),
			cameraName: 'camera1'
		}
	]
}

const mapStateToProps = (state) => {

	/*const viewportDivider = players && players.length === 1
    ? 1
    : (2 + Math.floor(players.length / 9));*/
	const {innerWidth, innerHeight} = window


	return {
		width: innerWidth,
		height: innerHeight,
		viewports: getViewPorts(innerWidth, innerHeight)
		//bodies: Object.keys(state.world.bodies).map((k) => state.world.bodies[k]),
		//players: getPlayers(state),
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onAnimate: () => {
			dispatch(onAnimate())
		}
	}
}


const SimpleContainer = connect(mapStateToProps, mapDispatchToProps)(Simple)

export default SimpleContainer
