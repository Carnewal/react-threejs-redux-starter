import React from 'react';
import THREE from 'three';

const { PropTypes } = React;

class PickableMesh extends React.Component {
  static propTypes = {
    position: PropTypes.instanceOf(THREE.Vector3).isRequired,
    quaternion: PropTypes.instanceOf(THREE.Quaternion).isRequired,
    killed: PropTypes.bool
  };



  render() {
    const {
      position,
      quaternion,
      killed
    } = this.props;

    return (<mesh
      position={position}
      quaternion={quaternion}
      ref="mesh"
      castShadow >
      <geometryResource
        resourceId='ballGeo' />
      <materialResource
        resourceId='ballMaterial' />
    </mesh>)
  }
}

export default PickableMesh;
