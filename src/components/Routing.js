import { Route, Routes } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout/MainLayout';
import MoviesPage from '../pages/MoviesPage/MoviesPage';
import SingleMoviePage from '../pages/SingleMoviePage/SingleMoviePage';
import HomePage from '../pages/HomePage/HomePage';
import FavoriteMovies from '../pages/FavoriteMovies/FavoriteMovies';

function Routing() {
    return (
        <>
            <Routes>
                <Route path={'/'} element={<MainLayout />}>
                    <Route index path={'/'} element={<HomePage />}></Route>
                    <Route path={'movies'}>
                        <Route index element={<MoviesPage />}></Route>
                        <Route path={':movieId'} element={<SingleMoviePage />}></Route>
                    </Route>
                    <Route path={'favorites'} element={<FavoriteMovies  />}></Route>
                </Route>
            </Routes>
        </>
    );
}

export default Routing;