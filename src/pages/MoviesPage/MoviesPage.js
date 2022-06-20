import MoviesList from '../../components/MoviesLists/MoviesList';
import './MoviesPage.scss';
import { forwardRef, useEffect, useRef, useState } from 'react';
import Filter from '../../components/Filter/Filter';
import Spinner from '../../components/Spinner/Spinner';
import SpinnerImage from '../../assets/img/spinner.gif';
import ErrorComponent from '../../components/ErrorComponent/ErrorComponent';


function MoviesPage() {
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [isParameter, setIsParameter] = useState(true);
    const [isLoadMore, setIsLoadMore] = useState(true);
    const [param, setParam] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const moviesRef = useRef();

    useEffect(() => {
        const url = `https://api.themoviedb.org/3/discover/movie?api_key=14ccdb96456935bbb41591e99697d262&language=ru-RU&page=${currentPage}${param}`;
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

    }, [isParameter, isLoadMore]);

    useEffect(() => {
        fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=14ccdb96456935bbb41591e99697d262&language=ru-RU')
            .then(response => response.json())
            .then(data => setGenres(data.genres))
    }, [])

    const handleSelectChange = (e) => {
       if(e.target.value !== 'all') {
           setIsParameter(!isParameter);
           setParam(e.target.value);
       } else {
           setParam('')
           setIsParameter(!isParameter);
       }
    }
    const handleLoadMoreClick = (e) => {
        if(e.target.name === 'forward') {
            setCurrentPage(currentPage + 1)
            setIsLoadMore(!isLoadMore)
        } else if(e.target.name === 'back') {
            setCurrentPage(currentPage - 1)
            setIsLoadMore(!isLoadMore)
        }
        moviesRef.current.scrollIntoView()
    }

    return (
        <div className={'container'}>

            {!isError && (<><h1 ref={moviesRef}>Фильмы</h1> <Filter genres={genres} event={handleSelectChange} /></>)}
            {isLoading && (<Spinner cName={'main-spinner'} image={SpinnerImage} />)}
            {isError && (<ErrorComponent cName={'error'} message={'Произошла ошибка при загрузке. Попробуйте обновить страницу'} />)}

            <MoviesList movies={movies} event={handleLoadMoreClick} pageNumber={currentPage} />

        </div>

    );
}

export default MoviesPage;