import React, { useState, useRef } from "react";
import { gsap } from "gsap";
import movieData from "/api/alienMovies.json";
import { Link } from "react-router-dom";

const TimelinePage = () => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const movieRef = useRef(null);

	const slideMovie = (direction) => {
		// Create a grandiose slide animation
		const duration = 0.5; // Increased duration for a grander effect

		// Animate the current movie out of view
		gsap.to(movieRef.current, {
			x: direction === "left" ? 300 : -300,
			opacity: 0,
			scale: 0.8,
			duration: duration,
			ease: "power4.in",
			onComplete: () => {
				// Update the currentIndex for the next movie
				setCurrentIndex((prevIndex) => {
					if (direction === "left") {
						return (prevIndex - 1 + movieData.length) % movieData.length;
					} else {
						return (prevIndex + 1) % movieData.length;
					}
				});

				// Set initial properties for the new movie
				gsap.set(movieRef.current, { x: direction === "left" ? -300 : 300, opacity: 0, scale: 0.8 });

				// Animate the new movie into view
				gsap.to(movieRef.current, {
					x: 0,
					opacity: 1,
					scale: 1,
					duration: duration,
					ease: "power4.out",
				});
			},
		});
	};

	return (
		<div className="terminal-container">
			<div className="scan-line"></div>
			<div className="timeline-page">
				<div className="flexHeader">
					<div className="terminal-header2">
						TERMINAL ACCESS: v7.1.2
						<br />
						SYSTEM: APOLLO CENTRAL COMPUTER
					</div>
					<div>
						<Link to="//" className="backButton">
							BACK
						</Link>
					</div>
				</div>

				<div className="timeline-display">
					<button className="nav-button left" onClick={() => slideMovie("left")}>
						&#9664;
					</button>

					<div className="movie-container" ref={movieRef}>
						<div className="projector-light"></div>
						<img src={movieData[currentIndex].image} alt={movieData[currentIndex].title} className="movie-poster" />
						<h2 className="movie-title">{movieData[currentIndex].title}</h2>
						<p className="movie-year">{movieData[currentIndex].year}</p>
						<p className="movie-description">{movieData[currentIndex].description}</p>
					</div>

					<button className="nav-button right" onClick={() => slideMovie("right")}>
						&#9654;
					</button>
				</div>
			</div>
		</div>
	);
};

export default TimelinePage;
