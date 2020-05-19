import React from 'react';
import { Question as IQuestion } from '../types';

const BASE_IMG_URL = 'https://image.tmdb.org/t/p/w500';

type Props = {
    question: IQuestion;
    onAnswer: (answer: boolean) => void
}

const Question = ({ question, onAnswer }: Props) => {
    return <div>
        <img src={`${BASE_IMG_URL}/${question.movie.poster}`} alt="" />
        <h1>Is {question.actor} in {question.movie.title}?</h1>
        <button onClick={() => onAnswer(true)}>Yes</button>
        <button onClick={() => onAnswer(false)}>No</button>
    </div>
}

export default Question;