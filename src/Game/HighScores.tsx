import React from 'react';
import { HighScore } from '../types';

type Props = {
    highScores: HighScore[]
}

const HighScores = ({ highScores }: Props) => {
    return <div>
        {highScores.sort((a, b) => a.score === b.score ? (a.username < b.username ? -1 : 1) : (a.score < b.score ? 1 : -1)).map((score, idx) => (<div key={idx.toString()}>
            <div>{score.username}</div>
            <div>{score.score} pts</div>
        </div>))}
    </div>
};

export default HighScores