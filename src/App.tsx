import React, { useState } from 'react';
import Landing from './Landing';
import Game from './Game/Game';
import HighScores from './Game/HighScores';
import { useHighScores } from './Game/hooks';

function App() {
  const [playing, setPlaying] = useState(false)
  const { highScores, resetScores, addToHighScores } = useHighScores();
  return (
    <div className="flex justify-center flex-col">
      <h1 className="text-4xl text-center">Movie Quizz</h1>
      {playing ? <Game onAddToHighScores={addToHighScores} /> : <Landing onStart={() => setPlaying(true)} />}
      <HighScores scores={highScores} onResetScores={resetScores} />
    </div>
  );
}

export default App;
