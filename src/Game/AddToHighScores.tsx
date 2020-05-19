import React, { useState, useCallback } from 'react';

type Props = {
    onAddToHighScore: (username: string) => void;
}

const AddToHighScores = ({ onAddToHighScore }: Props) => {
    const [username, setUsername] = useState('');
    const [done, setDone] = useState(false);
    const onAdd = useCallback(() => {
        onAddToHighScore(username);
        setDone(true)
    }, [onAddToHighScore, username, setDone]);
    return <div>
        {done ? <div>Added to highscores !</div> : (
            <>
                <input className="shadow appearance-none border rounded py-2 px-3 text-gray-700 mb-3" type="text" placeholder="Your name" value={username} onChange={evt => setUsername(evt.target.value)} />
                <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded cursor-pointer" onClick={onAdd}>Add to highscores</button>
            </>)}

    </div>
}

export default AddToHighScores;