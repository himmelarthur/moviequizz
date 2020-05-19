import { fetchMostPopularMovies } from './movieDB';

export interface GameData {
    movies: {
        title: string;
        poster: string;
        actors: string[]
    }[]
    actors: string[];
}

export const initData = async () => {
    const baseData = await fetchMostPopularMovies();
    return baseData.reduce<GameData>((prev, curr) => {
        // Only first three actors
        const actors = curr.cast.map(actor => actor.name).slice(0, 2);
        return {
            ...prev,
            movies: [...prev.movies, { title: curr.title, poster: curr.poster, actors }],
            actors: [...prev.actors, ...actors],
        }
    }, { movies: [], actors: [] });
}
