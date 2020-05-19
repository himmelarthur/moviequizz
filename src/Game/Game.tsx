import React, { useState, useEffect, useCallback } from 'react';
import Question from './Question';
import AddToHighScores from './AddToHighScores';
import { HighScore } from '../types';
import HighScores from './HighScores';

type GameState = {
    goodAnswers: number;
    secondsElapsed: number;
}

const LS_HS_KEY = 'highscores';

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

const useHighScores = () => {
    const [highScores, setHighScores] = useState<HighScore[]>([]);
    useEffect(() => {
        // Persistance
        const encodedHs = localStorage.getItem(LS_HS_KEY);
        if (encodedHs === null) {
            return;
        }
        try {
            const decodedHs = JSON.parse(atob(encodedHs));
            setHighScores(decodedHs);
        } catch (err) {
            console.warn('Could not decode the high scores from localstorage, removing');
            localStorage.removeItem(LS_HS_KEY)
        }
    }, []);
    const addToHighScores = useCallback((highScore: HighScore) => {
        const newHighScores = [...highScores, highScore];
        localStorage.setItem('highscores', btoa(JSON.stringify(newHighScores)))
        setHighScores(newHighScores);
    }, [highScores, setHighScores])
    return { highScores, addToHighScores };
};

const Game = () => {
    const { secondsElapsed, goodAnswers, finalState, handleAnswer, reset } = useInitGame();
    const { highScores, addToHighScores } = useHighScores();
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
                <Question onAnswer={handleAnswer}></Question>
            </div>}
        <HighScores highScores={highScores} />
    </div>
}

export default Game;
