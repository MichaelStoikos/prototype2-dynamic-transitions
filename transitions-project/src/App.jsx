import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoadingScreen from "./components/LoadingScreen";
import Crew from "./pages/Crew";
import TimelinePage from "./pages/AlienTimeline";
import XenomorphEvolution from "./pages/XenomorphEvolution";
import ThreeRoom from "./pages/ThreeRoom";

function App() {
	const [isLoading, setIsLoading] = useState(true);

	const handleLoadingComplete = () => {
		setIsLoading(false);
	};

	return (
		<Router basename="/prototype2-dynamic-transitions">
			{isLoading ? (
				<LoadingScreen path="/LoadingScreen" onLoadingComplete={handleLoadingComplete} />
			) : (
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/crew" element={<Crew />} />
					<Route path="/alien-timeline" element={<TimelinePage />} />
					<Route path="/xenomorph-evolution" element={<XenomorphEvolution />} />
					<Route path="/three-room" element={<ThreeRoom />} />
				</Routes>
			)}
		</Router>
	);
}

export default App;
