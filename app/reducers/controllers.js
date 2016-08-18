import Types from '../constants/actiontypes'
import Immutable from 'immutable'
import CtrlConst, { DefaultGamepadMapping } from '../constants/controller'

const calculateState = (gamepad, mappings) => {
  const state = {}
  Object.keys(CtrlConst).forEach((key) => {
    const mapping = mappings[CtrlConst[key]]
    if (mapping) {
      const data = gamepad[mapping.type][mapping.index]
      state[key] = data.value !== undefined ? data.value : (data || 0)
    }
  })
  return state
}

const handleGamepad = (controller, gamepad) => {
	if (!controller) {
		return {
			deviceId: gamepad.id,
			connectedAt: gamepad.timestamp,
			mapping: DefaultGamepadMapping,
			name: `padPlayer ${gamepad.index}`
		}
	} else if (controller.mapping) {
		return {
			...controller,
			controllerState: calculateState(gamepad, controller.mapping)
		}
	} else {
		console.log('no mapping for controller', controller)
	}
}

const handleGamepads = (controllers, gamepads) => {
	const collection = {}
	Object.keys(gamepads).forEach((i) => {
			if(gamepads[i]) {
				collection[`pad_${gamepads[i].index}`] = gamepads[i] ? handleGamepad(controllers[`pad_${gamepads[i].index}`], gamepads[i]) : null
			}
	})
	return collection
}


const controllers = (state = {
	collection: {}
}, action) => {
	switch(action.type) {

		case Types.ON_ANIMATE:
			return Immutable.fromJS(state).mergeIn(['collection'], handleGamepads(
				state.collection,
				navigator.getGamepads()
			)).toJS()

		default:
			return state
	}
}

export default controllers
