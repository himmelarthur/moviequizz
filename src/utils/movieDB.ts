const API_KEY = 'ae9fe5055de5c1c32a0c4818ce4671f9'
const BASE_URL = 'https://api.themoviedb.org/3'

interface TopRatedMoviesResponse {
    results: {
        id: number;
        poster_path: string;
        title: string;
    }[]
}

interface CreditsResponse {
    id: number;
    cast: {
        name: string;
    }[]
}

const fetchCast = async (movieId: number) => {
    const response = await fetch(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`)
    const credits: CreditsResponse = await response.json();
    return credits.cast;
}

export const fetchMostPopularMoviesPage = async (pageNumber: number) => {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${pageNumber}`);
    const page: TopRatedMoviesResponse = await response.json()
    const moviesWithCast = await Promise.all(page.results.map(async ({ id, title, poster_path }) => {
        const cast = await fetchCast(id);
        return {
            movieId: id,
            poster: poster_path,
            title,
            cast
        }
    }));
    return moviesWithCast
};

export const fetchMostPopularMovies = async () => {
    const pages = await Promise.all([1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(fetchMostPopularMoviesPage))
    return pages.reduce((prev, curr) => {
        return [...prev, ...curr]
    }, []);
}
