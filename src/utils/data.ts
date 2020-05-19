import { fetchTopRatedMovies } from './movieDB';

export interface GameData {
    movies: {
        title: string;
        poster: string;
        actors: string[]
    }[]
    actors: string[];
}

export const initData = async () => {
    const baseData = await fetchTopRatedMovies();
    return baseData.reduce<GameData>((prev, curr) => {
        return {
            ...prev,
            movies: [...prev.movies, { title: curr.title, poster: curr.poster, actors: curr.cast.map(actor => actor.name) }],
            actors: [...prev.actors, ...curr.cast.map(actor => actor.name).slice(0, 2)],
        }
    }, { movies: [], actors: [] });
}
