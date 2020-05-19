import React from 'react';
import { Question as IQuestion } from '../types';

const BASE_IMG_URL = 'https://image.tmdb.org/t/p/w300';

type Props = {
    question: IQuestion;
    onAnswer: (answer: boolean) => void
}

const Question = ({ question, onAnswer }: Props) => {
    return <div className="flex justify-between">
        <img src={`${BASE_IMG_URL}/${question.movie.poster}`} alt="" />
        <div className="flex flex-col">
            <h1 className="text-4xl p-8">Is {question.actor} in {question.movie.title}?</h1>
            <div className="flex items-center justify-center">

                <button className="bg-blue-500 mr-4 hover:bg-blue-700 text-white py-2 px-4 rounded cursor-pointer w-20" onClick={() => onAnswer(true)}>Yes</button>
                <button className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded cursor-pointer w-20" onClick={() => onAnswer(false)}>No</button>
            </div>

        </div>
    </div>
}

export default Question;