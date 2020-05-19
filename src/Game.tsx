import React, { useState, useEffect } from 'react';

const Game = () => {
    const [secondsElapsed, setSecondsElapsed] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setSecondsElapsed(secondsElapsed + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [secondsElapsed, setSecondsElapsed]);

    return <div><h1>Game</h1><div>{secondsElapsed} seconds elapsed</div></div>
}

export default Game;
