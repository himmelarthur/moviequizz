import React from 'react';

type Props = {
    onAnswer: (answer: boolean) => void
}

const Question = ({ onAnswer }: Props) => {
    return <div>
        <h1>Yes or no?</h1>
        <button onClick={() => onAnswer(true)}>Yes</button>
        <button onClick={() => onAnswer(false)}>No</button>
    </div>
}

export default Question;