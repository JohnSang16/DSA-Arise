import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Screens
import TitleScreen from './screens/TitleScreen';
import AuthScreen from './screens/AuthScreen';
import HubScreen from './screens/HubScreen';
import GameScreen from './screens/GameScreen';
import CutsceneScreen from './screens/CutsceneScreen';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TitleScreen />} />
        <Route path="/auth" element={<AuthScreen />} />
        <Route path="/hub" element={<HubScreen />} />
        <Route path="/game" element={<GameScreen />} />
        <Route path="/intro" element={<CutsceneScreen />} />
      </Routes>
    </Router>
  );
}

export default App;