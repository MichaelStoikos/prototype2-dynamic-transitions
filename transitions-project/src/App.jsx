import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoadingScreen from './components/LoadingScreen';
import Crew from './pages/Crew';
import AlienTimeline from './pages/AlienTimeline'; 
import XenomorphEvolution from './pages/XenomorphEvolution'; 

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <Router basename='/prototype2-dynamic-transitions'>
      {isLoading ? (
        <LoadingScreen onLoadingComplete={handleLoadingComplete} />
      ) : (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/crew" element={<Crew />} />
          <Route path="/alien-timeline" element={<AlienTimeline />} />
          <Route path="/xenomorph-evolution" element={<XenomorphEvolution />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
