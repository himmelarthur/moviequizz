import React, { useEffect } from 'react';
import Question from './Question';
import AddToHighScores from './AddToHighScores';
import HighScores from './HighScores';
import { useInitGame, useHighScores } from './hooks';

const Game = () => {
    const { secondsElapsed, goodAnswers, finalState, handleAnswer, reset, data, question } = useInitGame();
    const { highScores, addToHighScores } = useHighScores();
    if (!data || !question) return <div>Loading...</div>
    return <div>
        <h1>Movie Quizz</h1>
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
        <HighScores highScores={highScores} />
    </div>
}

export default Game;
