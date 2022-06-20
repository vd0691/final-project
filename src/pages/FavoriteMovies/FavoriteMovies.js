import MovieCard from '../../components/MovieCard/MovieCard';
import { useEffect, useMemo, useState } from 'react';
import Button from '../../components/Button/Button';

function FavoriteMovies() {
    const imageUrl = `https://image.tmdb.org/t/p/w500`;
    const movies = JSON.parse(localStorage.getItem('favorites'));
    const [isDelete, setIsDelete] = useState(false)

    const handleDeleteFavorites = () => {
        movies.splice(0);
        localStorage.setItem("favorites", JSON.stringify(movies));
        setIsDelete(true)
    }


    return (
        <div className={'container'}>
            <h1>Мои избранные фильмы</h1>
            {movies.length > 0 ? (
                <>
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
                    <Button cName={'favorite-delete'} title={'Удалить все'} event={handleDeleteFavorites}  />
                </>

            ) : (
                <span>Список пуст</span>
            )}
        </div>
    )
}

export default FavoriteMovies;