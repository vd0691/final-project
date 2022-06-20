import './Header.scss';
import Logo from '../../assets/img/logo.png';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import HeaderSearch from '../HeaderSearch/HeaderSearch';
import Login from '../Login/Login';

function Header() {

    return (
        <header className={'header'}>
            <div className={'header__container'}>
                <div className={'header__block header__block--left'}>
                    <Link to={'/'}><img src={Logo} alt='Онлайн кинотеатр'/></Link>
                    <Navigation cName={'nav'}  />
                    <Navigation cName={'mobile-nav'} isMobile={true} />
                    <HeaderSearch cname={'header-search'} />
                </div>

                <div className={'header__block header__block--right'}>
                    <Login />
                </div>

            </div>
        </header>
    );
}

export default Header;