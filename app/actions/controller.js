import Types from '../constants/actiontypes'
import CtrlConst from '../constants/controller'

export const ctrlConnected = (controller) => ({
	type: Types.CTRL_CONNECTED,
	id: controller.id,
 	index: controller.index,
	mapping: controller.mapping,
	timestamp: controller.timestamp
})


export const ctrlDisconnected = (controller) => ({
	type: Types.CTRL_DISCONNECTED,
	id: controller.id,
 	index: controller.index,
	mapping: controller.mapping,
	timestamp: controller.timestamp
})
