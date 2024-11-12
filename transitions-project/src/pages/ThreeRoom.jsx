import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import HangarModel from '../components/HangarModel';

const ThreeRoom = () => {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Canvas
        camera={{ position: [0, 3, 10], fov: 50 }} // Adjust the position and fov to make sure the model is visible
      >
        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 10, 5]} intensity={1} />

        {/* Load the Hangar Model */}
        <React.Suspense fallback={<div>Loading Hangar Model...</div>}>
          <HangarModel />
        </React.Suspense>

        {/* Optional: Controls to move around */}
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default ThreeRoom;
