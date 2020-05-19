import React from 'react';
import Question from './Question';
import AddToHighScores from './AddToHighScores';
import { useInitGame, useHighScores } from './hooks';

const Game = () => {
    const { secondsElapsed, goodAnswers, finalState, handleAnswer, reset, data, question } = useInitGame();
    const { addToHighScores } = useHighScores();
    if (!data || !question) return <div>Loading...</div>
    return <div>
        {finalState ? <div>
            <div>{finalState.goodAnswers} good answers</div>
            <div>{finalState.secondsElapsed} seconds</div>
            <AddToHighScores onAddToHighScore={(username) => addToHighScores({ username, score: finalState.goodAnswers })} />
            <button onClick={reset}>Play again</button>
        </div> : <div>
                <div>{goodAnswers} good answers</div>
                <div>{secondsElapsed} seconds elapsed</div>
                <Question question={question} onAnswer={handleAnswer}></Question>
            </div>}

    </div>
}

export default Game;
