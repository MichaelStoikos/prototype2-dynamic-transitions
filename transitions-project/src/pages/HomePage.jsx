import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";
import Typewriter from "typewriter-effect";

const HomePage = () => {
	const logoRef = useRef(null);
	const navigate = useNavigate();

	useEffect(() => {
		const textElements = document.querySelectorAll(".terminal-text");
		textElements.forEach((el, i) => {
			setTimeout(() => {
				el.classList.add("visible");
			}, i * 300);
		});

		gsap.to(logoRef.current, {
			rotationY: 720,
			duration: 20,
			repeat: 0,
			ease: "linear",
		});
	}, []);

	const handleExitTerminal = () => {
		gsap.to(".terminal-container", {
			opacity: 0,
			duration: 1.5,
			onComplete: () => {
				navigate("/three-room");
			},
		});
	};

	return (
		<div className="terminal-container">
			<div className="scan-line"></div>
			<div className="terminal-header">
				TERMINAL ACCESS: v7.1.2
				<br />
				SYSTEM: APOLLO CENTRAL COMPUTER
			</div>
			<div className="flexHome">
				<div className="terminal-content">
					<Link to="/crew" className="terminal-text">
						<h1>
							<Typewriter
								options={{
									autoStart: true,
									loop: false,
								}}
								onInit={(typewriter) => {
									typewriter.typeString("CREW").start();
								}}
							/>
						</h1>
					</Link>
					<Link to="/alien-timeline" className="terminal-text">
						<h1>
							<Typewriter
								options={{
									autoStart: true,
									loop: false,
								}}
								onInit={(typewriter) => {
									typewriter.typeString("ALIEN TIMELINE").start();
								}}
							/>
						</h1>
					</Link>
					<Link to="/xenomorph-evolution" className="terminal-text">
						<h1>
							<Typewriter
								options={{
									autoStart: true,
									loop: false,
								}}
								onInit={(typewriter) => {
									typewriter.typeString("XENOMORPH EVOLUTION").start();
								}}
							/>
						</h1>
					</Link>
					<button className="exit-terminal-button" onClick={handleExitTerminal}>
						[EXIT TERMINAL]
					</button>
				</div>
				<div className="homeBottom">
					STATUS: [SECURE]
					<img src="./WeylandYutaniLogo.jpg" alt="Logo" ref={logoRef} />
				</div>
			</div>
		</div>
	);
};

export default HomePage;
