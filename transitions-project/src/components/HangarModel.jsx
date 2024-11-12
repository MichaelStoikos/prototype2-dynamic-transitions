import React from 'react';
import { useGLTF } from '@react-three/drei';

const HangarModel = () => {
  const { scene } = useGLTF(import.meta.env.BASE_URL + 'public/Hangar/hangar.gltf');
  console.log(scene)

  scene.position.set(0, 0, 0);
  scene.scale.set(0.1, 0.1, 0.1);

  return <primitive object={scene} />;
};

useGLTF.preload('public/Hangar/hangar.gltf');

export default HangarModel;
