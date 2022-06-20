import { FaRegUser } from 'react-icons/fa';
import Button from '../Button/Button';
import { useEffect, useState } from 'react';
import './Login.scss'
import Form from '../Form/Form';
import Input from '../Input/Input';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import ErrorComponent from '../ErrorComponent/ErrorComponent';
import Validation from '../Validation/Validation';

function Login() {
    const [isLoginBttonClick, setIsLoginButtonClick] = useState(false);
    const [isProfileButtonClick, setIsProfileButtonClick] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState();
    const [requestError, setRequestError] = useState('');
    const [formIsValid, setFormIsValid] = useState(false);


    isLoginBttonClick ? document.body.style.overflowY = "hidden" : document.body.style.overflowY = "unset";

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setUser(foundUser);
        }
    }, []);

    const handleloginClick = () => setIsLoginButtonClick(!isLoginBttonClick);
    const handleProfileClick = () => setIsProfileButtonClick(!isProfileButtonClick);


    const handleLogout = () => {
        setUser(undefined);
        setUsername("");
        setPassword("");
        localStorage.removeItem('user');
        setIsProfileButtonClick(!isProfileButtonClick)
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const user = { username, password };

        try {
            const response = await axios.post(
                "http://blogservice.herokuapp.com/api/login",
                user
            );
            setUser(response.data);
            localStorage.setItem("user", JSON.stringify(response.data));
            setIsLoginButtonClick(!isLoginBttonClick)
        } catch (error) {
            if(error.response.status === 401) {
                setRequestError('Неверное пользователя или пароль')
            }
        }

    };

    return (
        <div className={'login'}>
            {!user ? (
                <Button
                    cName={'login__button'}
                    title={'Вход | Регистрация'}
                    event = {handleloginClick}
                    imageUrl={<FaRegUser size={'22px'} style={{color: '#fff'}} />}
                />
            ) : (
                <div className={'panel-wrapper'}>
                    <Button
                        cName={'login__panel'}
                        title={user.username}
                        imageUrl={<FaRegUser size={'22px'} style={{color: '#fff'}} />}
                        event={handleProfileClick}
                    />
                    {isProfileButtonClick && user && (
                        <div className={'profile-menu'}>
                            <ul className={'profile-menu__list'}>
                                <li className={'profile-menu__item'}><Link className={'profile-menu__link'} to={'/'}>Профиль</Link></li>
                                <li className={'profile-menu__item'}><Button cName={'profile-menu__button'} event={handleLogout} title={'Выход'} /></li>
                            </ul>
                        </div>
                    )}
                </div>
            )}

            <div className={!isLoginBttonClick ? 'login__wrapper' : 'login__wrapper active'}>
               <div className={'login__container'}>

                   <div className={'login__form-container'}>
                       <Button cName={'login__close'} event={handleloginClick} imageUrl={<AiOutlineClose size={25} />} />
                       <h2>Вход на сайт</h2>
                       <Form name={'login-form'}>
                           <div className={'login-form__group'}>
                               <Input cName={'login-form__input'} name={'user-email'} value={username} type={'email'} labelTitle={'Логин/E-mail'}  event={(e) => setUsername(e.target.value)} />
                           </div>
                           <div className={'login-form__group'}>
                               <Input cName={'login-form__input'} name={'user-password'} value={password} type={'password'} labelTitle={'Пароль'}  event={(e) => setPassword(e.target.value)} />
                           </div>
                           <Button cName={'login-form__button'} type={'submit'} title={'Войти'} event={handleSubmit} />
                       </Form>
                       <ErrorComponent message={requestError} />
                   </div>
               </div>
            </div>
        </div>
    )
}

export default Login;