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

    const world = new CANNON.World()
    world.quatNormalizeSkip = 0
    world.quatNormalizeFast = false
    world.gravity.set(0, 0, -9.82)
    world.broadphase = new CANNON.NaiveBroadphase()

    this.setState({
      world
    })


    const boxShape = new CANNON.Box(new CANNON.Vec3(0.25, 0.25, 0.25))
    const bodies = []
    const density = 2515
    const mass = density * boxShape.volume()


    for (let i = 0; i < N; ++i) {
      const boxBody = new CANNON.Body({
        mass,
        shape: boxShape,
        position: new CANNON.Vec3(
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 2,
          (Math.random()) * 15)
      })
      world.addBody(boxBody)
      bodies.push(boxBody)
    }

    this.setState({
      bodies
    })

    const groundBody = new CANNON.Body({
      mass: 0,
      shape: new CANNON.Plane(),
      initQuaternion: new THREE.Quaternion()
        .setFromAxisAngle(new THREE.Vector3(0, 0, 1), -Math.PI / 2)
    })

    world.addBody(groundBody)

    this.setState({
      groundBody
    })

    document.addEventListener('keydown', (e) => {
      this._jump()
    })
  }


  _jump() {
    const randomBody = this.state.bodies[Math.floor(Math.random() * this.state.bodies.length)];
    randomBody.velocity.set(5,0,8)
  }

  componentDidMount() {


  }

  componentDidUpdate() {

  }

  componentWillUnmount() {
    // delete this.world
    // delete this.stats
  }


  render() {
    const {
      width,
      height,
      viewports,
      cameras,
      fog,
      directionalLights
    } = this.props

    const {
      world,
      bodies,
      groundBody
    } = this.state


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
          this.state.world.step(timeStep)
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
