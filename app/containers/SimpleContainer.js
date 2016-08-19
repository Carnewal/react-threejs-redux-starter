import { connect } from 'react-redux'
import Simple from '../components/Simple'
import React3 from 'react-three-renderer'
import THREE from 'three'
// import Selectors from '../selectors'
import { ctrlConnected, ctrlDisconnected } from '../actions/controller'
import { onAnimate } from '../actions/world'



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
			width: width,
			height: (height / 2),
			cameraName: 'camera1'
		},
		{
			key: 'vp2',
			x: 0,
			y: (height / 2),
			width: width,
			height: (height / 2),
			cameraName: 'camera2'
		}
	]
}

const cameraPosition = new THREE.Vector3(0, -50, 15)
const cameraRotation = new THREE.Euler(0,0,Math.PI / 90)
const zeroPos = new THREE.Vector3(0, 0, Math.PI / 90, 0)
// const cameraQuaternion = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2)

const relativeCameraOffset = new THREE.Vector3(5,0,10)

const getCameras = (width, height, carBodies) => ([
 {
	 name: 'camera1',
	 ref: 'camera1',
	 key: 'camera1',
	 fov: 40,
	 aspect: (width/height),
	 near: 10,
	 far: 1000,
	 position: () => cameraPosition,
	 // rotation: cameraRotation,
	 lookAt: zeroPos
 },
 {
	name: 'camera2',
	ref: 'camera2',
	key: 'camera2',
	fov: 60,
	aspect: (width/height),
	near: 10,
	far: 1000,
	position: (target) => {
		return target && relativeCameraOffset.applyMatrix4( target.matrixWorld ) || new THREE.Vector3(0,0,0)
	},
	lookAt: carBodies && new THREE.Vector3().copy(carBodies[0].position) || new THREE.Vector3(0,0,0)
 },
])
const lightPosition = new THREE.Vector3(20, 20, 20)
const lightTarget = new THREE.Vector3(0, 0, 0)

const getDirectionalLights = () => ([
	{
		color: 0xffffff,
		intensity: 1.75,
		castShadow: true,
		shadowMapWidth: 1024,
		shadowMapHeight: 1024,
		shadowCameraLeft: -20,
		shadowCameraRight: 20,
		shadowCameraTop: 20,
		shadowCameraBottom: -20,
		shadowCameraFar: 60,
		shadowCameraNear: 20,

		position: lightPosition,
		lookAt: lightTarget
	}
])

const mapStateToProps = (state) => {

	/*const viewportDivider = players && players.length === 1
    ? 1
    : (2 + Math.floor(players.length / 9));*/
	const {innerWidth, innerHeight} = window
	return {
		width: innerWidth,
		height: innerHeight,
		viewports: getViewPorts(innerWidth, innerHeight),
		cameras: getCameras(innerWidth, innerHeight, state.world.carBodies),
		directionalLights: getDirectionalLights(),
		world: state.world.cannonWorld,
		ballBody: state.world.ballBody,
		carBodies: state.world.carBodies,
		groundBody: state.world.groundBody
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

const mergeProps = (stateProps, dispatchProps) => {
	return {
		...stateProps,
		onAnimate: () => {

			dispatchProps.onAnimate()

		}
	}
}


const SimpleContainer = connect(mapStateToProps, mapDispatchToProps)(Simple)

export default SimpleContainer
