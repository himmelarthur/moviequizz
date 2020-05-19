import React from 'react';
import { Question as IQuestion } from '../types';

type Props = {
    question: IQuestion;
    onAnswer: (answer: boolean) => void
}

const Question = ({ question, onAnswer }: Props) => {
    return <div>
        <h1>Is {question.actor} in {question.movie.title}?</h1>
        <button onClick={() => onAnswer(true)}>Yes</button>
        <button onClick={() => onAnswer(false)}>No</button>
    </div>
}

export default Question;