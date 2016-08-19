import React from 'react'
import React3 from 'react-three-renderer'
import THREE from 'three'
const quat = new THREE.Quaternion()
  .setFromAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI / 2)

const Ground = ({position, quaternion}) => {
  return (<mesh
    castShadow
    receiveShadow
    position={position}
    quaternion={quaternion}
  >
    <planeBufferGeometry
      width={100}
      height={100}
      widthSegments={1}
      heightSegments={1}
    />
    <meshLambertMaterial color={0x777777} />
  </mesh>)
}

export default Ground
