import React from 'react'
import THREE from 'three'
import React3 from 'react-three-renderer';


const Simple = ({cameraPosition, cubeRotation, width, height, onAnimate}) => (
  <React3
        mainCamera="camera"
        width={width}
        height={height}
        onAnimate={onAnimate}
      >
      <scene>
        <perspectiveCamera
          name="camera"
          fov={75}
          aspect={width / height}
          near={0.1}
          far={1000}
          position={cameraPosition}
        />
        <mesh
          rotation={cubeRotation}
        >
          <boxGeometry
            width={1}
            height={1}
            depth={1}
          />
          <meshBasicMaterial
            color={0x00ff00}
          />
        </mesh>
      </scene>
    </React3>
)
/*
class Simple extends React.Component {


  render() {

    const {cameraPosition, cubeRotation, width, height, onAnimate} = this.props

    return (<React3
      mainCamera="camera"
      width={width}
      height={height}
      onAnimate={onAnimate}
    >
      <scene>
        <perspectiveCamera
          name="camera"
          fov={75}
          aspect={width / height}
          near={0.1}
          far={1000}
          position={cameraPosition}
        />
        <mesh
          rotation={cubeRotation}
        >
          <boxGeometry
            width={1}
            height={1}
            depth={1}
          />
          <meshBasicMaterial
            color={0x00ff00}
          />
        </mesh>
      </scene>
    </React3>);
  }
}
*/

export default Simple