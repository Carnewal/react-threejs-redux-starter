const ControllerConstants = {
	LEFT_X: 'LEFT_X',
	LEFT_Y: 'LEFT_Y',
  BTN_A: 'A',
  BTN_B: 'B'
	// BTN_X: 'X',
  // BTN_Y: 'Y'
}

export const DefaultGamepadMapping = {
	'LEFT_X': { type: 'axes', index: 1},
	'LEFT_Y': { type: 'axes', index: 0 },
	'A': { type: 'buttons', index: 0 },
	'B': { type: 'buttons', index: 1 }
}


export default ControllerConstants
