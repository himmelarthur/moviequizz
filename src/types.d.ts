export type HighScore = {
    username: string;
    score: number;
}

export type GameState = {
    goodAnswers: number;
    secondsElapsed: number;
}

export type Question = {
    movie: {
        title: string;
        poster: string;
    }
    actor: string;
    answer: boolean;
}