import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PointerLockControls } from "@react-three/drei";
import * as THREE from "three";
import { useNavigate } from "react-router-dom";
import Hangar2 from "../components/Hangar2Model";
import Terminal from "../components/TerminalModel";
import Nostromo from "../components/NostromoModel";

// PlayerControls component remains the same
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
		moveDirection.current.set(0, 0, 0);

		if (keys.current.z) moveDirection.current.z += 1;
		if (keys.current.s) moveDirection.current.z -= 1;
		if (keys.current.q) moveDirection.current.x -= 1;
		if (keys.current.d) moveDirection.current.x += 1;

		moveDirection.current.normalize().multiplyScalar(speed * delta);

		const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
		const right = new THREE.Vector3(1, 0, 0).applyQuaternion(camera.quaternion);

		const forwardMove = forward.multiplyScalar(moveDirection.current.z);
		const rightMove = right.multiplyScalar(moveDirection.current.x);

		const combinedMove = forwardMove.add(rightMove);

		camera.position.add(combinedMove);
		camera.position.y = initialY.current;
	});

	return null;
};

// New component to handle distance checking
const TerminalProximityChecker = ({ onProximityChange }) => {
	const { camera } = useThree();
	const INTERACTION_RADIUS = 25;
	const terminalPosition = new THREE.Vector3(0, -20, -10);

	useFrame(() => {
		const distance = camera.position.distanceTo(terminalPosition);
		onProximityChange(distance < INTERACTION_RADIUS);
	});

	return null;
};

const ThreeRoom = () => {
	const controlsRef = useRef();
	const navigate = useNavigate();
	const [isNearTerminal, setIsNearTerminal] = useState(false);

	useEffect(() => {
		const handleKeyPress = (e) => {
			if (e.key.toLowerCase() === "e" && isNearTerminal) {
				document.exitPointerLock();
				navigate("//");
			}
		};

		window.addEventListener("keydown", handleKeyPress);
		return () => {
			window.removeEventListener("keydown", handleKeyPress);
		};
	}, [isNearTerminal, navigate]);

	useEffect(() => {
		if (controlsRef.current) {
			const { current: controls } = controlsRef;

			const onClick = () => {
				controls.lock();
			};

			document.addEventListener("click", onClick);
			return () => {
				document.removeEventListener("click", onClick);
			};
		}
	}, []);

	return (
		<>
			<div style={{ width: "100%", height: "100vh" }}>
				<Canvas camera={{ position: [0, 1.6, 5], fov: 80 }}>
					<ambientLight intensity={0.5} />
					<pointLight position={[100, 100, 100]} />
					<Nostromo />
					<Hangar2 />
					<Terminal />
					<PlayerControls speed={30} />
					<PointerLockControls ref={controlsRef} />
					<TerminalProximityChecker onProximityChange={setIsNearTerminal} />
				</Canvas>
			</div>
			{isNearTerminal && (
				<div
					style={{
						position: "fixed",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						color: "white",
						fontSize: "1.2rem",
						fontFamily: "Arial, sans-serif",
						textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
						pointerEvents: "none",
						userSelect: "none",
						zIndex: 1000,
					}}
				>
					Press E to interact
				</div>
			)}
		</>
	);
};

export default ThreeRoom;
