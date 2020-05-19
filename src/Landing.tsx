import React from 'react';

type Props = {
    onStart: () => void;
}

const Landing = ({ onStart }: Props) => {
    return <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded cursor-pointer w-20 m-auto" onClick={onStart}>Play</button>
}

export default Landing
