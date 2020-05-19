import React from 'react';
import { HighScore } from '../types';

type Props = {
    highScores: HighScore[]
}

const HighScores = ({ highScores }: Props) => {
    return <div>
        {highScores.map((score, idx) => (<div key={idx.toString()}>
            <div>{score.username}</div>
            <div>{score.score} pts</div>
        </div>))}
    </div>
};

export default HighScores