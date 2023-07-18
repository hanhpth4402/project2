import { useState } from 'react'
import './Login.scss'
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { handelLoginHandmade, handleLogin } from '../../redux/actions/userAction';
import { ToastContainer } from 'react-toastify';

function Login () {

    const [showPassword, setShowPassword] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [warningEmail, setWarningEmail] = useState(false);
    const [warningPassword, setWarningPassword] = useState(false);

    const navigation = useNavigate();
    
    const handelOnChangePassword = (event) => {
        if (event.target.value === "" && !warningPassword) {
            setWarningPassword(true);
        }

        if (event.target.value !== "" && warningPassword) {
            setWarningPassword(false);
        }
        
        setPassword(event.target.value)
    }

    const handelOnChangeEmail = (event) => {
        if (event.target.value === "" && !warningEmail) {
            setWarningEmail(true);
        }

        if (event.target.value !== "" && warningEmail) {
            setWarningEmail(false);
        }
        
        setEmail(event.target.value)
    }

    var dispatch = useDispatch();

    const handelLogin = async () => {
        if (!warningEmail && email === "") setWarningEmail(true);
        if (!warningPassword && password === "") setWarningPassword(true);
        if (email !== "" || password !== "") {
            dispatch(handelLoginHandmade(email, password));
        };
        navigation('/');
    }

    var data = useSelector(state => state.user);

    return (
        <>
            <div className='login-block'>
                <div className='login-container rounded-0 shadow'>
                    <div className='login-title'>
                        <span>
                            ĐĂNG NHẬP
                        </span>
                    </div>
                    <div className='login-inner'>
                        <div className='login-form'>
                            <div className='form__inner'>

                                <div className='form__item_input form__email'>
                                    <div className='form__item-main'>
                                        <span className='form__item-title'>
                                            Địa Chỉ Email
                                        </span>
                                        <input 
                                            type='email' 
                                            placeholder='email' 
                                            className={`${warningEmail? 'form__warning' : null} form__item-input form__item-email`}
                                            value={email}
                                            onChange={(event) => handelOnChangeEmail(event)}
                                        />
                                    </div>
                                    <div className='form__item-warning warning-pass' style={{opacity: `${warningEmail ? 1: 0}`}}>
                                        *Không được bỏ trống
                                    </div>
                                </div>

                                <div className='form__item_input form__password'>
                                    <div className='for__item-main'>
                                        <span className='form__item-title'>
                                            Mật Khẩu
                                        </span>
                                        <span className='input_password'>
                                            <input 
                                                type={`${showPassword ? 'password' : 'text'}`} 
                                                placeholder='password' 
                                                className={`${warningPassword? 'form__warning' : null} form__item-input form__item-password`}
                                                onChange={(event) => handelOnChangePassword(event)}
                                            />
                                            <span className='form__item-inpur-eye'>
                                                <i 
                                                    class={`form__item-input-password-eyesicon ${showPassword===false ? 'fa-solid fa-eye-slash': 'fa-solid fa-eye'}`}
                                                    onClick={() => {
                                                        setShowPassword(!showPassword);
                                                    }}    
                                                ></i>
                                            </span>
                                        </span>
                                    </div>
                                    <div className='form__item-warning warning-pass' style={{opacity: `${warningPassword ? 1: 0}`}}>
                                        *Không được bỏ trống
                                    </div>
                                </div>

                                <div className='form__item form__checkbox'>
                                    <input type='checkbox' className='form__checkbox-inner'/>
                                    Ghi Nhớ Tôi
                                </div>

                                <div className='form__item form__btn'>
                                    <div className='form__item-btn btn-login'>
                                        <span className='btn-icon icon-login'>
                                            {!data.isLoading && <i className='fa-solid fa-right-to-bracket'/>}
                                            {data.isLoading && <i className="fas fa-circle-notch fa-spin"/>}
                                        </span>
                                        <span 
                                            className='form__btn-item btn-title-login'
                                            onClick={() => handelLogin()}
                                        >
                                            Đăng Nhập
                                        </span>
                                    </div>
                                    <div className='form__item-btn btn-register'>
                                        <span className='btn-icon icon-register'>
                                            <i className='fa-solid fa-right-to-bracket'/>
                                        </span>
                                        <NavLink 
                                            className='form__btn-item btn-title-register'
                                            to = '/register'
                                        >
                                            Đăng Ký
                                        </NavLink>
                                    </div>
                                    <div className='form__item-forget'>
                                        <a className='form__link-item'>
                                            Quên Mật Khẩu?
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='login-social'>
                            <div className='login-social_item'>
                                Hoặc Đăng Nhập Bằng
                            </div>
                            <div className='social_item social-facebook'>
                                <i className="social_item-icon fa-brands fa-facebook-f"/>
                                <span className="social_item-name">
                                Facebook
                                </span>
                            </div>
                            <div className='social_item social_item social-google'>
                                <i className="social_item-icon fa-brands fa-google"/>
                                <span className="social_item-name">
                                Google
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer
                position="top-left"
                autoClose={500}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                backdrop="static"
                keyboard={false}        
            />  
        </>
    )
}

export default Login