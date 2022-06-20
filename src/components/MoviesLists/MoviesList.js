import MovieCard from '../MovieCard/MovieCard';
import './MoviesList.scss';
import Button from '../Button/Button';
import { FaAngleLeft, FaAngleRight, FaHeart } from 'react-icons/fa';


function MoviesList(props) {
    const imageUrl = `https://image.tmdb.org/t/p/w500`;
    const leftButtonClassName = props.pageNumber > 1 ? 'movies-list__button movies-list__button--left' : 'movies-list__button movies-list__button--left last';
    const buttonDisableValue = props.pageNumber > 1 ? false : true;
    
    return (
       <>
           {props.movies.length > 0 && (
               <div className={'movies-wrapper'}>
                   <ul className={'movies-list'}>
                       {props.movies.map(movie => (
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
                   <div className={'page-paginaton'}>
                       <Button name={'back'} title={'Предыдущая страница'} cName={leftButtonClassName} disableValue={buttonDisableValue} event={props.event} imageUrl={<FaAngleLeft />} />
                       <Button name={'forward'} title={'Следуюшая страница'} cName={'movies-list__button movies-list__button--right'} event={props.event} imageUrl={<FaAngleRight />} />
                   </div>
               </div>
               )}
       </>
    );
}

export default MoviesList;