import { useState } from 'react'
import { NavLink } from 'react-router-dom';
import styles from './Register.module.scss';
import classNames from 'classnames/bind';

var cx = classNames.bind(styles);


function Register () {

    const [showPassword, setShowPassword] = useState(true);
    const [showPassword2, setShowPassword2] = useState(true);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const [warningName, setWarningName] = useState(false);
    const [warningEmail, setWarningEmail] = useState(false);
    const [warningPassword, setWarningPassword] = useState(false);
    const [warningPassword2, setWarningPassword2] = useState(false);

    const handelOnChangeName = (event) => {
        if (event.target.value === "" && !warningName) {
            setWarningName(true);
        }

        if (event.target.value !== "" && warningName) {
            setWarningName(false);
        }
        
        setName(event.target.value);
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
    
    const handelOnChangePassword = (event) => {
        if (event.target.value === "" && !warningPassword) {
            setWarningPassword(true);
        }

        if (event.target.value !== "" && warningPassword) {
            setWarningPassword(false);
        }
        
        setPassword(event.target.value)
    }

    const handelOnChangePassword2 = (event) => {
        if ((event.target.value !== password) && !warningPassword2) {
            setWarningPassword2(true);
        }

        if ((event.target.value === password) && warningPassword2) {
            setWarningPassword2(false);
        }
        
        setPassword2(event.target.value)
    }

    const handelRegister = () => {
        if (!warningEmail && email === "") setWarningEmail(true);
        if (!warningPassword2 && password2 === "") setWarningPassword2(true);
        if (!warningPassword && password === "") setWarningPassword(true);
        if (!warningName && name === "") setWarningName(true);

        if (warningEmail || warningName || warningPassword || warningPassword2) {
            console.log ('hfjdkaf');
        }

        else {

        }
    }

    return (
        <>
            <div className={cx('register--login-block')}>
                <div className={cx('register--login-container', "rounded-0 shadow")}>
                    <div className={cx('register--login-title')}>
                        <span>
                            ĐĂNG KÝ
                        </span>
                    </div>
                    <div className={cx('register--login-inner')}>
                        <div className={cx('register--login-form')}>
                            <div className={cx('register--form__inner')}>
                                <div className={cx('register--form__item_input', 'form__email')}>
                                    <div className={cx('register--form__item-main')}>
                                        <span className={cx('register--form__item-title')}>
                                            Họ và Tên
                                        </span>
                                        <input 
                                            type='name' 
                                            placeholder='name' 
                                            className={cx({['register--form__warning']: warningName}, 'register--form__item-input')}
                                            value={name}
                                            onChange={(event) => handelOnChangeName(event)}
                                        />
                                    </div>
                                    <div className={cx('register--form__item-warning', 'warning-pass')} style={{opacity: `${warningName ? 1: 0}`}}>
                                        *Không được bỏ trống
                                    </div>
                                </div>

                                <div className={cx('register--form__item_input', 'form__email')}>
                                    <div className={cx('register--form__item-main')}>
                                        <span className={cx('register--form__item-title')}>
                                            Địa Chỉ Email
                                        </span>
                                        <input 
                                            type='email' 
                                            placeholder='email' 
                                            className={cx({['register--form__warning']: warningEmail}, 'register--form__item-input')}
                                            value={email}
                                            onChange={(event) => handelOnChangeEmail(event)}
                                        />
                                    </div>
                                    <div className={cx('register--form__item-warning', 'warning-pass')} style={{opacity: `${warningEmail ? 1: 0}`}}>
                                        *Không được bỏ trống
                                    </div>
                                </div>

                                <div className={cx('register--form__item_input', 'form__password')}>
                                    <div className={cx('register--for__item-main')}>
                                        <span className={cx('register--form__item-title')}>
                                            Mật Khẩu
                                        </span>
                                        <span className={cx('register--input_password')}>
                                            <input 
                                                type={`${showPassword ? 'password' : 'text'}`} 
                                                placeholder='password' 
                                                className={cx({['register--form__warning']: warningPassword}, 'register--form__item-input', 'register--form__item-password')}
                                                onChange={(event) => handelOnChangePassword(event)}
                                            />
                                            <span className={cx('register--form__item-inpur-eye')}>
                                                <i 
                                                    className={cx('register--form__item-input-password-eyesicon', {'fa-solid fa-eye-slash': !showPassword}, {'fa-solid fa-eye': showPassword})}
                                                    onClick={() => {
                                                        setShowPassword(!showPassword);
                                                    }}    
                                                ></i>
                                            </span>
                                        </span>
                                    </div>
                                    <div className={cx('register--form__item-warning', 'warning-pass')} style={{opacity: `${warningPassword ? 1: 0}`}}>
                                        *Không được bỏ trống
                                    </div>
                                </div>

                                <div className={cx('register--form__item_input', 'form__password')}>
                                    <div className={cx('register--for__item-main')}>
                                        <span className={cx('register--form__item-title')}>
                                            Nhập Lại Mật Khẩu
                                        </span>
                                        <span className={cx('register--input_password')}>
                                            <input 
                                                type={`${showPassword2 ? 'password' : 'text'}`} 
                                                placeholder='password' 
                                                className={cx({['register--form__warning']: warningPassword2}, 'register--form__item-input', 'register--form__item-password')}
                                                onChange={(event) => handelOnChangePassword2(event)}
                                            />
                                            <span className={cx('register--form__item-inpur-eye')}>
                                                <i 
                                                    className={'form__item-input-password-eyesicon ' + cx({'fa-solid fa-eye-slash': !showPassword2}, {'fa-solid fa-eye': showPassword2})}
                                                    onClick={() => {
                                                        setShowPassword2(!showPassword2);
                                                    }}    
                                                ></i>
                                            </span>
                                        </span>
                                    </div>
                                    <div className={cx('register--form__item-warning', 'warning-pass')} style={{opacity: `${warningPassword2 ? 1: 0}`}}>
                                        *Nhắc lại chính xác mật khẩu
                                    </div>
                                </div>

                                <div className={cx('register--form__item', 'register--form__btn')}>
                                    <div className={cx('register--form__item-btn', 'register--btn-login')}>
                                        <span className={cx('register--btn-icon', 'icon-login')}>
                                            <i className={cx('register--register-icon') + " fa-solid fa-right-to-bracket"}/>
                                        </span>
                                        <span 
                                            className={cx('register--form__btn-item', 'btn-title-login')}
                                            onClick={() => handelRegister()}
                                        >
                                            Đăng Ký
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('register--login-social')}>
                            <div className={cx('register--login-social_item')}>
                                Hoặc Đăng Ký Bằng
                            </div>
                            <div className={cx('register--social_item', 'register--social-facebook')}>
                                <i className={cx('register--social_item-icon') + ' fa-brands fa-facebook-f'}/>
                                <span className={cx("register--social_item-name")}>
                                Facebook
                                </span>
                            </div>
                            <div className={cx('register--social_item', 'register--social_item', 'register--social-google')}>
                                <i className={cx('register--social_item-icon') + ' fa-brands fa-google'}/>
                                <span className={cx("register--social_item-name")}>
                                Google
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register;