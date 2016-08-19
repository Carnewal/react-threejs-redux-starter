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


class PhysicsMousePick extends React.Component {

  constructor() {
    super()
  }

  componentWillMount() {

    document.addEventListener('keydown', (e) => {
      this._jump()
    })
  }


  _jump() {
    const randomBody = this.props.bodies[Math.floor(Math.random() * this.props.bodies.length)];
    randomBody.velocity.set(0,0,10)
  }



  render() {
    const {
      width,
      height,
      viewports,
      cameras,
      fog,
      directionalLights,
      world,
      bodies,
      groundBody
    } = this.props



    const cubeMeshes = bodies.map(({ position, quaternion }, i) => {
      const pos = new THREE.Vector3().copy(position)
      const quat = new THREE.Quaternion().copy(quaternion)
      return (<PickableMesh
        key={i}

        position={pos}
        quaternion={quat}

        bodyIndex={i}

        />)

    })

    return (<div ref="container" >
      <React3
        antialias
        width={width}
        height={height}
        onAnimate={() => {
          this.props.world.step(timeStep)
          this.props.onAnimate()
        }}
        clearColor={fog.color} >

        {viewports.map((vp) => <viewport {...vp} />)}


        <resources>
          <boxGeometry
            resourceId="cubeGeo"
            width={0.5}
            height={0.5}
            depth={0.5}

            widthSegments={10}
            heightSegments={10}
          />
          <meshPhongMaterial
            resourceId="cubeMaterial"

            color={0x888888}
          />
        </resources>

        <scene
          ref="scene"
          fog={fog}
        >
        {cameras.map((c, i) => <perspectiveCamera {...c} key={i}/>)}

          <ambientLight color={0x666666} />

          {directionalLights.map((dL, i) => <directionalLight {...dL} key={i}/>)}

          <Ground position={new THREE.Vector3().copy(groundBody.position)}
            quaternion={new THREE.Quaternion().copy(groundBody.quaternion)}/>

          {cubeMeshes}
        </scene>

      </React3>
    </div>)
  }
}

export default PhysicsMousePick
