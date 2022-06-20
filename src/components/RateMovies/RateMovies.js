import { useEffect, useState } from 'react';
import MovieCard from '../MovieCard/MovieCard';
import Filter from '../Filter/Filter';
import Spinner from '../Spinner/Spinner';
import SpinnerImage from '../../assets/img/spinner.gif';
import ErrorComponent from '../ErrorComponent/ErrorComponent';



function PopularMovies() {
    const imageUrl = `https://image.tmdb.org/t/p/w500`;
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    useEffect(() => {
        const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=14ccdb96456935bbb41591e99697d262&language=ru-RU`;
        setIsLoading(true);
        fetch(url)
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error('Ошибка на сервере: ' + response.status)
                }
                return response.json()
            })

            .then(data => {
                setIsLoading(false)
                setIsError(false)
                setMovies(data.results)
            })

            .catch((error) => {
                setIsLoading(false);
                setIsError(true);
                console.log(error);
            })

    }, []);
    return (
        <div>
            {!isError && (<><h2>Фильмы с высоким рейтингом</h2></>)}
            {isLoading && (<Spinner cName={'main-spinner'} image={SpinnerImage} />)}
            {isError && (<ErrorComponent cName={'error'} message={'Произошла ошибка при загрузке. Попробуйте обновить страницу'} />)}

            {movies.length > 0 && (
                <div className={'movies-wrapper'}>
                    <ul className={'movies-list'}>
                        {movies.map(movie => (
                            <li key={movie.id} className={'movies-list__item'}>
                                <MovieCard id={movie.id} imageUrl={imageUrl} movie={movie} isEnableFavorite={true}>
                                    <div className={'movie-card__image-section'}>
                                        <img className={'movie-card__image'} src={imageUrl + movie.poster_path} alt={movie.title} />
                                    </div>
                                    <div className={'movie-card__title-section'}>
                                        <p className={'movie-card__title'}>{movie.title}</p>
                                    </div>
                                </MovieCard>
                            </li>

                        ))}
                    </ul>

                </div>
            )}
        </div>
    )
}

export default PopularMovies;