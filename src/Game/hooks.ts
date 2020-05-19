import { useState, useEffect, useCallback } from "react";
import { HighScore, GameState, Question } from "../types";
import { GameData, initData } from '../utils/data';
import { pick } from "../utils/arrays";
import { load, save } from "../utils/db";

const LS_HS_KEY = 'highscores';


export const useInitGame = () => {
    const [secondsElapsed, setSecondsElapsed] = useState(0);
    const [goodAnswers, setGoodAnswers] = useState(0);
    const [finalState, setFinalState] = useState<GameState>();
    const [data, setData] = useState<GameData>();
    const [question, setQuestion] = useState<Question>();

    const generateNewQuestion = (gameData: GameData) => {
        if (!gameData) return;
        const movie = pick(gameData.movies);
        const answer = Math.random() > 0.5;
        const actor = answer ? pick(movie.actors) : pick(gameData.actors)
        setQuestion({ movie, actor, answer })
    };

    useEffect(() => {
        initData().then(gameData => {
            generateNewQuestion(gameData);
            setData(gameData);
        })
    }, []);

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
        if (!question || !data) {
            return;
        }
        if (answer === question.answer) {
            setGoodAnswers(goodAnswers + 1);
            generateNewQuestion(data);
        } else {
            endGame()
        }
    }, [setGoodAnswers, goodAnswers, endGame, question, data]);

    const reset = () => {
        setSecondsElapsed(0);
        setGoodAnswers(0);
        if (data)
            generateNewQuestion(data);
        setFinalState(undefined);
    }

    return { secondsElapsed, goodAnswers, finalState, handleAnswer, reset, data, question };
}

export const useHighScores = () => {
    const [highScores, setHighScores] = useState<HighScore[]>([]);
    useEffect(() => {
        const savedScores = load<HighScore[]>(LS_HS_KEY);
        if (savedScores) setHighScores(savedScores)
    }, []);
    const addToHighScores = useCallback((highScore: HighScore) => {
        const newHighScores = [...highScores, highScore];
        save(LS_HS_KEY, newHighScores)
        setHighScores(newHighScores);
    }, [highScores, setHighScores])
    const resetScores = () => {
        save(LS_HS_KEY, [])
        setHighScores([]);
    }
    return { highScores, addToHighScores, resetScores };
};
