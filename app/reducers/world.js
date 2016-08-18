import Types from '../constants/actiontypes'
import THREE from 'three'
import CANNON from 'cannon'
import Immutable from 'immutable'

const mr = Math.random

const mass = 5
const cubeShape = new CANNON.Box(new CANNON.Vec3(0.25, 0.25, 0.25))
const playerShape = new CANNON.Box(new CANNON.Vec3(1, 0.5, 1))

const world = (state = {
  cannonWorld: new CANNON.World({
    quatNormalizeSkip: 0,
    quatNormalizeFast: false,
    gravity: new CANNON.Vec3(),
    broadphase: new CANNON.NaiveBroadphase()
  }),
  bodies: {},
  players: {}
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
