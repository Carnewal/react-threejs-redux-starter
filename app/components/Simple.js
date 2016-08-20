import React from 'react'
import React3 from 'react-three-renderer'
import THREE from 'three'
import CANNON from 'cannon'

import PickableMesh from './mesh/PickableMesh'
import Ground from './mesh/Ground'

const backVector = new THREE.Vector3(0, 0, -1)
const timeStep = 1 / 60
const d = 20
const N = 100

const cameraOffset = new THREE.Vector3(-40,0,40)

class PhysicsMousePick extends React.Component {

  constructor() {
    super()
  }

  _move() {
    this.props.carBodies.forEach((c) => c.velocity.set(0,0,20))
  }

  componentWillMount() {
    document.addEventListener('keydown', (e) => {
      this._move()
    })
  }

  render() {
    const {
      width,
      height,
      viewports,
      onAnimate,
      directionalLights,
      world,
      ballBody,
      carBodies,
      groundBody
    } = this.props


    return (<div ref="container" >
      <React3
        antialias
        width={width}
        height={height}
        onAnimate={onAnimate}
        clearColor={0x001525} >

        {viewports.map((vp, i) => <viewport key={i} {...vp} />)}


        <resources>
          <boxGeometry
            resourceId='carGeo'
            width={4}
            height={3.5}
            depth={2}

            widthSegments={1}
            heightSegments={1}
          />
          <sphereGeometry
            resourceId='ballGeo'
            radius={1}
            widthSegments={20}
            heightSegments={20}
            />
          <meshPhongMaterial
            resourceId="carMaterial"
            color={0x888888}
          />
          <meshPhongMaterial
            resourceId="ballMaterial"
            color={0xffc34d}
          />
        </resources>

        <scene
          ref="scene"
        >

          <ambientLight color={0x666666} />

          {directionalLights.map((dL, i) => <directionalLight {...dL} key={i}/>)}

          <Ground position={new THREE.Vector3().copy(groundBody.position)}
            quaternion={new THREE.Quaternion().copy(groundBody.quaternion)}/>

          <PickableMesh
            position={new THREE.Vector3().copy(ballBody.position)}
            quaternion={new THREE.Quaternion().copy(ballBody.quaternion)}
            />

          {carBodies.map(({position, quaternion}, i) => (
            <group>
              <perspectiveCamera name={`camera${i}`}
                ref={`camera${i}`}
                key={`camera${i}`}
                fov={40}
                aspect={width / height}
                near={10}
                far={1000}
                position={cameraOffset}
                lookAt={new THREE.Vector3()} />
              <mesh key={i}
                ref={`car${i}`}

                  quaternion={new THREE.Quaternion().copy(quaternion)}
                castShadow >
                <geometryResource resourceId='carGeo' />
                <materialResource resourceId='carMaterial' />
              </mesh>
            </group>))}

        </scene>

      </React3>
    </div>)
  }
}

export default PhysicsMousePick
