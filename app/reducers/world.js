import Types from '../constants/actiontypes'
import THREE from 'three'
import CANNON from 'cannon'
import Immutable from 'immutable'

const mr = Math.random

const N = 100

const cannonWorld = new CANNON.World()
cannonWorld.quatNormalizeSkip = 0
cannonWorld.quatNormalizeFast = false
cannonWorld.gravity.set(0, 0, -9.82)
cannonWorld.broadphase = new CANNON.NaiveBroadphase()

const cubeShape = new CANNON.Box(new CANNON.Vec3(0.25, 0.25, 0.25))
const playerShape = new CANNON.Box(new CANNON.Vec3(1, 0.5, 1))
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
  cannonWorld.addBody(boxBody)
  bodies.push(boxBody)
}
const groundBody = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Plane(),
  initQuaternion: new THREE.Quaternion()
  .setFromAxisAngle(new THREE.Vector3(0, 0, 1), -Math.PI / 2)
})

cannonWorld.addBody(groundBody)

const world = (state = {
  cannonWorld,
  bodies,
  groundBody
}, action) => {
	switch(action.type) {
    /*case Types.ON_ANIMATE:
      state.cannonWorld.step(1/60)
      return state

		case Types.ADD_CUBE:
      const cube = new CANNON.Body({
        mass: mass,
        shape: cubeShape,
        position: new THREE.Vector3(-2.5 + mr() * 5, 2.5 + mr() * 5, -2.5 + mr() * 5)
      })
      state.cannonWorld.addBody(cube)
      state.bodies.push({type: 'cube', id: cube.id})

    case Types.CTRL_ADD:
      const player = new CANNON.Body({
        mass: mass,
        shape: playerShape,
        position: new THREE.Vector3(-2.5 + mr() * 5, 2.5 + mr() * 5, -2.5 + mr() * 5)
      })

      const newState = Immutable
        .fromJS(state)
        .setIn(['players', action.id], { bodyId: player.id })
        .setIn(['bodies', player.id], player)
        .toJS()
      newState.cannonWorld.addBody(player)


      return newState
*/
		default:
			return state
	}
}

export default world
