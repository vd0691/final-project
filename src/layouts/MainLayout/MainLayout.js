import Header from "../../components/Header/Header";
import { Outlet } from 'react-router-dom';
import './MainLayout.scss'

function MainLayout() {
    return (
        <>
            <Header />
            <main className={'main'}>
                <Outlet />
            </main>
        </>
    );
}

export default MainLayout;