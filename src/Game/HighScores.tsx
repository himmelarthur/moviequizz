import React from 'react';
import { HighScore } from '../types';

type Props = {
    scores: HighScore[]
    onResetScores: () => void;
}

const HighScores = ({ scores, onResetScores }: Props) => {
    if (!scores.length) return <div></div>
    return <div className="mt-4">
        <h1 className="text-3xl">Highscores</h1>
        {scores.sort((a, b) => a.score === b.score ? (a.username < b.username ? -1 : 1) : (a.score < b.score ? 1 : -1)).map((score, idx) => (
            <div className="flex items-center" key={idx.toString()}>
                <div className="pr-4">{score.username}</div>
                <div>{score.score} pts</div>
            </div>
        ))}
        <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded cursor-pointer" onClick={() => {
            if (window.confirm('Do you want to reset high scores?')) {
                onResetScores();
            }
        }}>Reset Highscores</button>
    </div>
};

export default HighScores
