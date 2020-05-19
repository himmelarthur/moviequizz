import React, { useState } from 'react';
import Landing from './Landing';
import Game from './Game/Game';

function App() {
  const [playing, setPlaying] = useState(false)
  return (
    <div className="App">
      {playing ? <Game /> : <Landing onStart={() => setPlaying(true)} />}
    </div>
  );
}

export default App;
