import React, { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PointerLockControls, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
//import Hangar from "../components/HangarModel";
import Hangar2 from "../components/Hangar2Model"
import Terminal from "../components/TerminalModel"
import Nostromo from "../components/NostromoModel"

const PlayerControls = ({ speed = 5 }) => {
	const { camera } = useThree();
	const moveDirection = useRef(new THREE.Vector3());
	const keys = useRef({
		z: false,
		q: false,
		s: false,
		d: false,
	});
	const initialY = useRef(camera.position.y);

	useEffect(() => {
		const handleKeyDown = (e) => {
			switch (e.key.toLowerCase()) {
				case "z":
					keys.current.z = true;
					break;
				case "q":
					keys.current.q = true;
					break;
				case "s":
					keys.current.s = true;
					break;
				case "d":
					keys.current.d = true;
					break;
				default:
					break;
			}
		};

		const handleKeyUp = (e) => {
			switch (e.key.toLowerCase()) {
				case "z":
					keys.current.z = false;
					break;
				case "q":
					keys.current.q = false;
					break;
				case "s":
					keys.current.s = false;
					break;
				case "d":
					keys.current.d = false;
					break;
				default:
					break;
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		window.addEventListener("keyup", handleKeyUp);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
			window.removeEventListener("keyup", handleKeyUp);
		};
	}, []);

	useFrame((_, delta) => {
		// Reset movement vector
		moveDirection.current.set(0, 0, 0);

		// Set movement based on keypresses
		if (keys.current.z) moveDirection.current.z += 1;
		if (keys.current.s) moveDirection.current.z -= 1;
		if (keys.current.q) moveDirection.current.x -= 1;
		if (keys.current.d) moveDirection.current.x += 1;

		// Normalize to avoid faster diagonal movement and multiply by speed
		moveDirection.current.normalize().multiplyScalar(speed * delta);

		// Calculate the direction relative to the camera's rotation matrix
		const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
		const right = new THREE.Vector3(1, 0, 0).applyQuaternion(camera.quaternion);

		// Project movement vector onto forward and right directions
		const forwardMove = forward.multiplyScalar(moveDirection.current.z);
		const rightMove = right.multiplyScalar(moveDirection.current.x);

		// Add the forward and right movement to get final direction
		const combinedMove = forwardMove.add(rightMove);

		// Update camera position based on combined movement
		camera.position.add(combinedMove);
		camera.position.y = initialY.current;
	});

	return null;
};

const ThreeRoom = () => {
	const controlsRef = useRef();

	useEffect(() => {
		// Manually handle pointer lock for better control
		if (controlsRef.current) {
			const { current: controls } = controlsRef;

			const onClick = () => {
				controls.lock(); // Lock the pointer when user clicks the canvas
			};

			document.addEventListener("click", onClick);

			return () => {
				document.removeEventListener("click", onClick);
			};
		}
	}, []);

	return (
		<div style={{ width: "100%", height: "100vh" }}>
			<Canvas camera={{ position: [0, 1.6, 5], fov: 80 }}>
				<ambientLight intensity={0.5} />
				<pointLight position={[100, 100, 100]} />
				<Hangar2 />
				<Terminal />
				<Nostromo />
				<OrbitControls />
				<PlayerControls speed={80} />
				{/*<PointerLockControls ref={controlsRef} /> */}
			</Canvas>
		</div>
	);
};

export default ThreeRoom;
