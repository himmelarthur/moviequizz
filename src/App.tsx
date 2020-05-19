import React, { useState } from 'react';
import Landing from './Landing';
import Game from './Game/Game';
import HighScores from './Game/HighScores';

function App() {
  const [playing, setPlaying] = useState(false)
  return (
    <div className="App">
      <h1>Movie Quizz</h1>
      {playing ? <Game /> : <Landing onStart={() => setPlaying(true)} />}
      <HighScores />
    </div>
  );
}

export default App;
