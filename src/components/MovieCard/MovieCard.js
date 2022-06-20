import './MovieCard.scss';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import { FaHeart } from 'react-icons/fa';
import { useEffect, useState } from 'react';

function MovieCard(props) {
    const [isFavorite, setIsFavorite] = useState(false);

    const addFavoritesToogle = () => {
        const favoritesList = JSON.parse(localStorage.getItem('favorites')) || [];
        const isMovie = favoritesList.some(favoriteMovie => favoriteMovie.id === props.movie.id)
        if(isMovie) {
            const index = favoritesList.findIndex(item => item.id === props.movie.id);
            favoritesList.splice(index, 1);
            localStorage.setItem("favorites", JSON.stringify(favoritesList));
            setIsFavorite(false)
        } else {
            favoritesList.push(props.movie)
            localStorage.setItem("favorites", JSON.stringify(favoritesList));
            setIsFavorite(true)
        }

    }

    useEffect(() => {
        addFavoritesToogle()
    }, [])
    return (
        <div className={'movie-card'}>
             <Link to={`/movies/${props.id}`} className={props.cName}>
                 {props.children}
             </Link>
            {props.isEnableFavorite &&(
                <Button cName={'favorite-item'} event={addFavoritesToogle} imageUrl={!isFavorite ? <FaHeart size={22} /> : <FaHeart size={22} style={{color: '#f00'}} />} />
            )}

        </div>
    );
}

export default MovieCard;