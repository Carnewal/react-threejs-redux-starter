import React, { PropTypes } from 'react'
import THREE from 'three'
import React3 from 'react-three-renderer';
import Player from './mesh/Player.js'

const fog = new THREE.Fog(0x001525, 10, 40);
const lightPosition = new THREE.Vector3(d, d, d);
const lightTarget = new THREE.Vector3(0, 0, 0);
const d = 20

class Simple extends React.Component {
componentWillMount() {
  window.addEventListener("gamepadconnected", (e) => this.props.onControllerConnected(e.gamepad));
  window.addEventListener("gamepaddisconnected", (e) => this.props.onControllerDisconnected(e.gamepad));
}

render () {
  const {
    cameraPosition,
    cubeRotation,
    width,
    height,
    players,
    bodies,
    onAnimate,
    onControllerConnected,
    onControllerDisconnected
  } = this.props


  return <React3
    mainCamera={'camera'}
    width={width}
    height={height}
    onAnimate={onAnimate}

    clearColor={fog.color}
    antialias
    gammaInput
    gammaOutput
    shadowMapEnabled

    >

    {/*players.map(({_viewport, _camera}) => // Create viewports for splitscreen
      <viewport
        key={_viewport.key}
        x={_viewport.x}
        y={_viewport.y}
        width={_viewport.width}
        height={_viewport.height}
        cameraName={_camera.id}/>)
    */}
      <scene>

            <perspectiveCamera
              name="camera"
              fov={30}
              aspect={width / height}
              near={0.5}
              far={10000}

              position={this.cameraPosition}
              quaternion={this.cameraQuaternion}

              ref="camera"
            />

          <ambientLight
            color={0x666666}
          />
          <directionalLight
            color={0xffffff}
            intensity={1.75}

            castShadow

            shadowMapWidth={1024}
            shadowMapHeight={1024}

            shadowCameraLeft={-d}
            shadowCameraRight={d}
            shadowCameraTop={d}
            shadowCameraBottom={-d}

            shadowCameraFar={3 * d}
            shadowCameraNear={d}

            position={this.lightPosition}
            lookAt={this.lightTarget}
          />
      {/*players.map(({_camera}) => // Create cameras
        <perspectiveCamera
          key={_camera.id}
          name={_camera.id}
          fov={75}
          aspect={width/height}
          near={0.1}
          far={1000}
          position={_camera.position}
          quaternion={_camera.quaternion} />
      )*/}
      {bodies.map(({id, position, quaternion}) => <Player key={id} position={position} quaternion={quaternion} />)}
    </scene>
  </React3>
}

}

Simple.propTypes = {
  cameraPosition: PropTypes.object,
  cubeRotation: PropTypes.object,
  width: PropTypes.number,
  height: PropTypes.number,
  onAnimate: PropTypes.func,
  onControllerConnected: PropTypes.func,
  onControllerDisconnected: PropTypes.func,
  players: PropTypes.array,
  cameras: PropTypes.array,
  viewports: PropTypes.array
}

Simple.defaultProps = {
  players: [],
  cameras: [],
  viewports: []
}

export default Simple
