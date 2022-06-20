import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function SingleMoviePage() {

    const {movieId} = useParams();
    const [movie, setMovie] = useState({})

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=14ccdb96456935bbb41591e99697d262&language=ru-RU`)
            .then(response => response.json())
            .then(data => setMovie(data))
    })

    return (
        <div className={'container'}>
            {movie.title}
        </div>
    );
}

export default SingleMoviePage;