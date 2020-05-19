import React from 'react';

type Props = {
    onStart: () => void;
}

const Landing = ({ onStart }: Props) => {
    return <button onClick={onStart}>Play</button>
}

export default Landing