import React from 'react';
import Question from './Question';
import AddToHighScores from './AddToHighScores';
import { useInitGame } from './hooks';

type Props = {
    onAddToHighScores: (username: string, score: number, time: number) => void;
}

const Game = ({ onAddToHighScores }: Props) => {
    const { secondsElapsed, goodAnswers, finalState, handleAnswer, reset, data, question } = useInitGame();
    if (!data || !question) return <div>Loading...</div>
    return <div>
        {finalState ? <div>
            <div>Game over!</div>
            <div>{finalState.goodAnswers} good answers</div>
            <div>{finalState.secondsElapsed} seconds</div>
            <AddToHighScores onAddToHighScore={(username) => onAddToHighScores(username, finalState.goodAnswers, finalState.secondsElapsed)} />
            <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded cursor-pointer" onClick={reset}>Play again</button>
        </div> : <div>
                <div>{goodAnswers} good answers</div>
                <div>{secondsElapsed} seconds</div>
                <Question question={question} onAnswer={handleAnswer}></Question>
            </div>}

    </div>
}

export default Game;
