import React from 'react'
import React3 from 'react-three-renderer'
import THREE from 'three'
import CANNON from 'cannon'

import PickableMesh from './mesh/PickableMesh'
import Ground from './mesh/Ground'

const backVector = new THREE.Vector3(0, 0, -1)
const dragPlane = new THREE.Plane()

class PhysicsMousePick extends React.Component {

  constructor(props, context) {
    super()
    const N = 100

    this._raycaster = new THREE.Raycaster()

    const d = 20

    this.lightPosition = new THREE.Vector3(d, d, d)
    this.lightTarget = new THREE.Vector3(0, 0, 0)
    this.groundQuaternion = new THREE.Quaternion()
      .setFromAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI / 2)


    const world = new CANNON.World()

    const bodies = []
    const meshRefs = []

    let constrainedBody
    let pivot

    const initCannon = () => {
      world.quatNormalizeSkip = 0
      world.quatNormalizeFast = false

      world.gravity.set(0, -10, 0)
      world.broadphase = new CANNON.NaiveBroadphase()

      const mass = 5

      const boxShape = new CANNON.Box(new CANNON.Vec3(0.25, 0.25, 0.25))

      for (let i = 0; i < N; ++i) {
        const boxBody = new CANNON.Body({
          mass,
        })

        boxBody.addShape(boxShape)
        boxBody.position.set(
          -2.5 + Math.random() * 5,
          2.5 + Math.random() * 5,
          -2.5 + Math.random() * 5)
        world.addBody(boxBody)
        bodies.push(boxBody)

        meshRefs.push((mesh) => {
          if (mesh) {
            mesh.userData._bodyIndex = i

            this.meshes.push(mesh)
          }
        })
      }

      const groundShape = new CANNON.Plane()
      const groundBody = new CANNON.Body({ mass: 0 })

      groundBody.addShape(groundShape)
      groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2)

      world.addBody(groundBody)

      const shape = new CANNON.Sphere(0.1)
      const jointBody = new CANNON.Body({ mass: 0 })
      jointBody.addShape(shape)
      jointBody.collisionFilterGroup = 0
      jointBody.collisionFilterMask = 0

      world.addBody(jointBody)

      this.jointBody = jointBody
    }

    initCannon()

    const timeStep = 1 / 60
    const updatePhysics = () => {
      // Step the physics world
      world.step(timeStep)
    }

    const _getMeshStates = () => bodies
      .map(({ position, quaternion }, bodyIndex) => ({
        position: new THREE.Vector3().copy(position),
        quaternion: new THREE.Quaternion().copy(quaternion),
        ref: meshRefs[bodyIndex],
      }))

    this._onAnimate = () => {
      updatePhysics()

      this.setState({
        meshStates: _getMeshStates(),
      })
      this.props.onAnimate()

    }


    this.state = {
      clickMarkerVisible: false,
      clickMarkerPosition: new THREE.Vector3(),

      meshStates: _getMeshStates(),
    }

    this.meshes = []
  }


  componentDidMount() {


  }

  componentDidUpdate(newProps) {

  }

  componentWillUnmount() {
    delete this.world
    delete this.stats
  }


  render() {
    const {
      width,
      height,
      viewports,
      cameras,
      fog
    } = this.props

    const {
      clickMarkerVisible,
      clickMarkerPosition,
      meshStates,
    } = this.state

    const d = 20

    const cubeMeshes = meshStates.map(({ position, quaternion }, i) =>
      (<PickableMesh
        key={i}

        position={position}
        quaternion={quaternion}

        bodyIndex={i}

        meshes={this.meshes}

      />))

    return (<div ref="container" >
      <React3
        antialias
        width={width}
        height={height}

        onAnimate={this._onAnimate}

        clearColor={fog.color}


      >
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
        {cameras.map((c) => <perspectiveCamera {...c} />)}

          <ambientLight color={0x666666} />
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

          <Ground />

          {cubeMeshes}
        </scene>

      </React3>
    </div>)
  }
}

export default PhysicsMousePick
