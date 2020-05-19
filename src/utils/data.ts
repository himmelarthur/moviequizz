import { fetchMostPopularMovies } from './movieDB';
import { save, load } from './db';

export interface GameData {
    movies: {
        title: string;
        poster: string;
        actors: string[]
    }[]
    actors: string[];
}

export const initData = async () => {
    const gameData = load<GameData>('gameData');
    if (gameData) return gameData;
    const baseData = await fetchMostPopularMovies();
    const freshData = baseData.reduce<GameData>((prev, curr) => {
        // Only first three actors
        const actors = curr.cast.map(actor => actor.name).slice(0, 2);
        return {
            ...prev,
            movies: [...prev.movies, { title: curr.title, poster: curr.poster, actors }],
            actors: [...prev.actors, ...actors],
        }
    }, { movies: [], actors: [] });
    save('gameData', freshData);
    return freshData
}
