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

export const DefaultKeyboardMapping = {
	'LEFT_X': { codes: [81, 68]},
	'LEFT_Y': { codes: [90, 83] },
	'A': { code: 32 },
	'B': { code: 67 }
} 

export default ControllerConstants
