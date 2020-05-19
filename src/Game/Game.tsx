import React, { useState, useEffect, useCallback } from 'react';
import Question from './Question';

type GameState = {
    goodAnswers: number;
    secondsElapsed: number;
}

const useInitGame = () => {
    const [secondsElapsed, setSecondsElapsed] = useState(0);
    const [goodAnswers, setGoodAnswers] = useState(0);
    const [finalState, setFinalState] = useState<GameState>();

    useEffect(() => {
        const interval = setInterval(() => {
            setSecondsElapsed(secondsElapsed + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [secondsElapsed, setSecondsElapsed]);

    const endGame = useCallback(() => {
        setFinalState({ goodAnswers, secondsElapsed })
    }, [goodAnswers, secondsElapsed, setFinalState]);

    const handleAnswer = useCallback((answer: boolean) => {
        if (answer) {
            setGoodAnswers(goodAnswers + 1);
        } else {
            endGame()
        }
    }, [setGoodAnswers, goodAnswers]);

    const reset = () => {
        setSecondsElapsed(0);
        setGoodAnswers(0);
        setFinalState(undefined);
    }

    return { secondsElapsed, goodAnswers, finalState, handleAnswer, reset };
}

const Game = () => {
    const { secondsElapsed, goodAnswers, finalState, handleAnswer, reset } = useInitGame();
    return <div>
        <h1>Movie Quizz</h1>
        <div>{secondsElapsed} seconds elapsed</div>
        <div>{goodAnswers} good answers</div>
        {finalState ? <div>
            <div>{finalState.goodAnswers} good answers</div>
            <div>{finalState.secondsElapsed} seconds</div>
            <button onClick={reset}>Play again</button>
        </div> : <Question onAnswer={handleAnswer}></Question>}
    </div>
}

export default Game;
