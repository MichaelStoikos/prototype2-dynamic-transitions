import React, { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const NostromoModel = () => {
	const { scene } = useGLTF(import.meta.env.BASE_URL + "uscss_nostromo.glb");

	useEffect(() => {
		if (scene) {
			scene.position.set(0, -20, 0);
			scene.scale.set(250, 200, 200);
		}
	}, [scene]);

	return (
		<>
			<ambientLight intensity={0.3} />

			<directionalLight position={[10, 10, 5]} intensity={1} castShadow />

			<pointLight position={[0, 5, 10]} intensity={0.8} />

			<spotLight position={[15, 20, 5]} angle={0.3} penumbra={1} intensity={1} castShadow />

			<primitive object={scene} />
		</>
	);
};
useGLTF.preload(import.meta.env.BASE_URL + "uscss_nostromo.glb");

export default NostromoModel;