import './Filter.scss';

function Filter({genres, event}) {
    return (
        <div className={'filter-box'}>
            {genres.length > 0 && (
                <div className={'filter-box__genres'}>
                    <select className={'filter-box__genres-select'} onChange={event}>
                        <option value={'all-genres'}>Все жанры</option>
                        {genres.map(genre => (
                            <option key={genre.id} value={`&with_genres=${genre.id}`}>{genre.name}</option>
                        ))}
                    </select>
                </div>
            )}
        </div>
    )
}

export default Filter;