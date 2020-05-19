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
        {done ? <div>Added to highscores !</div> : (<><input type="text" placeholder="Your name" value={username} onChange={evt => setUsername(evt.target.value)} />
            <button onClick={onAdd}>Add to highscores</button></>)}

    </div>
}

export default AddToHighScores;