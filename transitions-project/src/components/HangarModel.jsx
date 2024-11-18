import React, { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const HangarModel = () => {
	const { scene } = useGLTF(import.meta.env.BASE_URL + "Hangar/hangar.gltf");

	useEffect(() => {
		if (scene) {
			scene.position.set(0, 34, 15);
			scene.scale.set(10, 10, 10);

			const textureLoader = new THREE.TextureLoader();
			const wallDiffuse = textureLoader.load(import.meta.env.BASE_URL + "Hangar/textures/Walls_diffuse.png");
			const wallNormal = textureLoader.load(import.meta.env.BASE_URL + "Hangar/textures/Walls_normal.png");

			// Traverse the scene to find the walls and apply the textures
			scene.traverse((child) => {
				if (child.isMesh && child.name.includes("Wall")) { // Replace 'Wall' with the actual wall mesh name if needed
					child.material = new THREE.MeshStandardMaterial({
						map: wallDiffuse,
						normalMap: wallNormal,
					});
				}
				
				if (child.name.includes("Window")) { // Replace with the actual name of the window mesh
					// Create a transparent material for the window
					child.material = new THREE.MeshStandardMaterial({
						color: 0x000000, // Dark tint
						opacity: 0.3, // Adjust transparency
						transparent: true,
						roughness: 0.1, // Slight reflectivity
						metalness: 0.8, // Metallic effect for glass
						envMapIntensity: 1, // Enhances reflections if you use an environment map
					});
				}
			});
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
useGLTF.preload(import.meta.env.BASE_URL + "Hangar/hangar.gltf");

export default HangarModel;
