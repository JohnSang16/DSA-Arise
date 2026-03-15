import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Screens
import TitleScreen from './screens/TitleScreen';
import AuthScreen from './screens/AuthScreen';
import HubScreen from './screens/HubScreen';
import GameScreen from './screens/GameScreen';

// Components
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<TitleScreen />} />
        <Route path="/auth" element={<AuthScreen />} />
        <Route path="/hub" element={<HubScreen />} />
        <Route path="/game" element={<GameScreen />} />
      </Routes>
    </Router>
  );
}

export default App;