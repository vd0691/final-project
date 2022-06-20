import './Navigation.scss';
import { Link, NavLink } from "react-router-dom";
import { FaHome, FaVideo } from 'react-icons/fa';

function Navigation({cName, isMobile}) {

    return (
        <>
            {isMobile ? (
                <nav className={cName}>
                    <ul className={cName + '__list'}>
                        <li className={cName + '__item'}><Link className={cName + '__link'} to={'/'}><span><FaHome size={'22px'} /></span>Главная</Link></li>
                        <li className={cName + '__item'}><Link className={cName + '__link'} to={'movies'}><span><FaVideo size={'22px'} /></span>Фильмы</Link></li>
                        <li className={cName + '__item'}><Link className={cName + '__link'} to={'favorites'}><span><FaVideo size={'22px'} /></span>Избранное</Link></li>
                    </ul>
                </nav>
                ) : (

                <nav className={cName}>
                    <ul className={cName + '__list'}>
                        <li className={cName + '__item'}><Link className={cName + '__link'} to={'/'}>Главная</Link></li>
                        <li className={cName + '__item'}><Link className={cName + '__link'} to={'movies'}>Фильмы</Link></li>
                        <li className={cName + '__item'}><Link className={cName + '__link'} to={'favorites'} activeClassName={'active-link'} >Избранное</Link></li>
                    </ul>
                </nav>
                )}
        </>


    );
}

export default Navigation;