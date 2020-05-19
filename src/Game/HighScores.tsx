import React from 'react';
import { useHighScores } from './hooks';

const HighScores = () => {
    const { highScores, resetScores } = useHighScores();
    if (!highScores.length) return <div></div>
    return <div>
        {highScores.sort((a, b) => a.score === b.score ? (a.username < b.username ? -1 : 1) : (a.score < b.score ? 1 : -1)).map((score, idx) => (<div key={idx.toString()}>
            <div>{score.username}</div>
            <div>{score.score} pts</div>
        </div>))}
        <button onClick={() => {
            if (window.confirm('Do you want to reset high scores?')) {
                resetScores();
            }
        }}>Reset Highscores</button>
    </div>
};

export default HighScores
