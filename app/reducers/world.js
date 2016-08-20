import Types from '../constants/actiontypes'
import THREE from 'three'
import CANNON from 'cannon'
import Immutable from 'immutable'

const mr = Math.random
const timeStep = 1 / 30
const N = 10

const cannonWorld = new CANNON.World()

cannonWorld.gravity.set(0, 0, -9.82)
cannonWorld.broadphase = new CANNON.NaiveBroadphase()

const carShape = new CANNON.Box(new CANNON.Vec3(2, 1.75, 1))

const ballShape = new CANNON.Sphere(1)

const carBodies = []
const carBody1 = new CANNON.Body({
  mass: 200,
  shape: carShape,
  position: new CANNON.Vec3(-10,0,10)
})
const carBody2 = new CANNON.Body({
  mass: 200,
  shape: carShape,
  position: new CANNON.Vec3(-20,0,10)
})
cannonWorld.addBody(carBody1)
cannonWorld.addBody(carBody2)

carBodies.push(carBody1)
carBodies.push(carBody2)


const mass = 50
const sphereMaterial = new CANNON.Material()

const ballBody = new CANNON.Body({
  mass,
  material: sphereMaterial,
  shape: ballShape,

  position: new CANNON.Vec3(0,0,10)
})


cannonWorld.addBody(ballBody)


const groundMaterial = new CANNON.Material()
const groundBody = new CANNON.Body({
  mass: 0,
  material: groundMaterial,
  shape: new CANNON.Plane(),
})
cannonWorld.addBody(groundBody)
cannonWorld.addContactMaterial(new CANNON.ContactMaterial(groundMaterial, sphereMaterial, { friction: 0.0, restitution: 0.5 }))


const world = (state = {
  cannonWorld,
  ballBody,
  carBodies,
  groundBody
}, action) => {
	switch(action.type) {

    case Types.ON_ANIMATE:
      state.carBodies.forEach((c) => {
        c.position.set(c.position.x + 0.05, c.position.y, c.position.z)

      })
      state.cannonWorld.step(timeStep)

		default:
			return state
	}
}

export default world
