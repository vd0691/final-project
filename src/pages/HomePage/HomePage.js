import NowPlayingMovies from '../../components/NowPlayingMovies/NowPlayingMovies';
import RateMovies from '../../components/RateMovies/RateMovies';

function HomePage() {
    return (
        <div className={'container'}>
            <NowPlayingMovies />
            <RateMovies />
        </div>
    )
}

export default HomePage;