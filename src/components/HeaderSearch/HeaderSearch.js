import Input from '../Input/Input';
import Button from '../Button/Button';
import './HeaderSearch.scss';
import { FaSearch, FaWindowClose } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import MovieCard from '../MovieCard/MovieCard';
import Form from '../Form/Form';

function HeaderSearch({cname}) {
    const imageUrl = `https://image.tmdb.org/t/p/w500`;
    const [buttonValue, setButtonValue] = useState(false);
    const [results, setResults] = useState([]);

    const handleButtonClick = (e) => {
        e.preventDefault();
        setButtonValue(!buttonValue);
    }

    const handleDocumentClick = () => {
        setResults([]);
    }

    useEffect(() => {
        document.addEventListener('click', handleDocumentClick);
        return function () {
            document.removeEventListener('click', handleDocumentClick);
        }
    }, [])

    const searchButtonIcon = !buttonValue ? <FaSearch size={'22px'} style={{color: '#fff'}} /> : <FaWindowClose size={'22px'} style={{color: '#fff'}} />;



    const fetchData = (e) => {
        const query = e.target.value;
        if(query) {
            fetch(`https://api.themoviedb.org/3/search/multi?api_key=14ccdb96456935bbb41591e99697d262&query=${query}&language=ru-RU`)
                .then(response => response.json())
                .then(data => setResults(data.results))
        } else {
            setResults([])
        }
    }

    const filteredResults = results.filter(element => {
        if(element.poster_path === null || element.poster_path === undefined) {
            return false;
        }
        return true;
    });


    return (
      <Form name={cname}>
          <Input cName={!buttonValue ? 'header-search__field' : 'header-search__field active'} event={fetchData} name={'search_field'} />
          <Button cName={'header-search__button'} event={handleButtonClick} imageUrl={searchButtonIcon} />
          {results.length > 0 && buttonValue && (
              <div className={'search-results'}>
                  <ul className={'search-results__list'}>
                      {filteredResults.map(item => (
                          <li className={'search-results__item'} key={item.id}>
                              <MovieCard id={item.id} cName={'search-results__link'}  movie={item} isEnable={false}>
                                  <div className={'search-results__image'}>
                                      <img src={imageUrl + item.poster_path} />
                                  </div>
                                  <div className={'search-results__description'}>
                                      <div>{item.media_type === 'movie' ? item.title : item.name}</div>
                                      <div className={'search-results__info'}>
                                          <p>
                                              {item.release_date === undefined && item.first_air_date === undefined  ? '' : item.media_type === 'movie' ? item.release_date.slice(0, -6) : item.first_air_date.slice(0, -6)}

                                          </p>
                                      </div>
                                  </div>
                              </MovieCard>
                          </li>
                      ))}
                  </ul>
              </div>
          )}
      </Form>
    )
}

export default HeaderSearch;