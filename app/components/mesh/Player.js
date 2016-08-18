import React, {PropTypes} from 'react'
import THREE from 'three'

class Player extends React.Component {



  render () {
    const { position, quaternion } = this.props

    return <mesh
      position={new THREE.Vector3().copy(position)}
      quaternion={new THREE.Quaternion().copy(quaternion)}
    >
      <boxGeometry width={1}
        height={1}
        depth={1} />
      <meshBasicMaterial color={0x00ff00} />
    </mesh>
  }

}
export default Player
