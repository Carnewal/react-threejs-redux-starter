import React from 'react';
import THREE from 'three';

const { PropTypes } = React;

class PickableMesh extends React.Component {
  static propTypes = {
    position: PropTypes.instanceOf(THREE.Vector3).isRequired,
    quaternion: PropTypes.instanceOf(THREE.Quaternion).isRequired,

  };



  render() {
    const {
      position,
      quaternion,
    } = this.props;

    return (<mesh
      position={position}
      quaternion={quaternion}
      ref="mesh"
      castShadow >
      <geometryResource
        resourceId="cubeGeo" />
      <materialResource
        resourceId="cubeMaterial" />
    </mesh>)
  }
}

export default PickableMesh;
