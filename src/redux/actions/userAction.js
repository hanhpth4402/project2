import { toast } from 'react-toastify';
import { loginApi, loginHandmade, registerHandmade, user } from '../../server/UserService'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const USER_LOGIN = 'USER_LOGIN';
export const FETCH_USER_LOGIN = 'FETCH_USER_LOGIN';
export const FETCH_USER_LOGIN_ERROR = 'FETCH_USER_LOGIN_ERROR';
export const FETCH_USER_LOGIN_SUCCESS = 'FETCH_USER_LOGIN_SUCCESS';

export const USER_REGISTER = 'USER_REGISTER';
export const FETCH_USER_REGISTER = 'FETCH_USER_REGISTER';
export const FETCH_USER_REGISTER_ERROR = 'FETCH_USER_REGISTER_ERROR';
export const FETCH_USER_REGISTER_SUCCESS = 'FETCH_USER_REGISTER_SUCCESS';


export const USER_LOGOUT = 'USER_LOGOUT';
export const USER_REFRESH = 'USER_REFRESH';


export const handelLoginHandmade = (email, password) => {
    return async (dispatch, getState) => {
        dispatch({type: FETCH_USER_LOGIN});

        let respond = await loginHandmade(email, password);

        if (respond && respond.length === 1) {
            let res = respond[0];
            localStorage.setItem("email", email);
            localStorage.setItem("id", res.ID_USERS);
            localStorage.setItem("username", res.USERNAME);

            toast.success('Login thành công');
            dispatch({
                type: FETCH_USER_LOGIN_SUCCESS,
                data: {
                    id: res.ID_USERS,
                    username: res.USERNAME,
                    email: res.EMAIL,
                    auth: true,
                }
            })
        } else {
            console.log(respond);
            if (respond && respond.status === 400) {
                console.log (respond.status);
            }
            toast.error("Login thất bại")
            dispatch({
                type: FETCH_USER_LOGIN_ERROR
            })
        }
    }
}

export const handleRegister = ({username, email, password}) => {
    return async (dispatch, getState) => {
        dispatch ({type: FETCH_USER_REGISTER});
        let respond = await registerHandmade ({username, email, password});

        if (respond && respond.type === "success") {
            dispatch({type: FETCH_USER_REGISTER_SUCCESS})
        } else {
            console.log(respond.message);
            dispatch({type: FETCH_USER_LOGIN_ERROR})
        }
    }
}


export const handleLogin = (email, password) => {
    return async (dispatch, getState) => {
        dispatch({type: FETCH_USER_LOGIN});
        let res = await loginApi(email, password);

        if (res && res.token) {
            localStorage.setItem("email", email);
            localStorage.setItem("token", res.token);
            localStorage.setItem("name", "Pham Thi Hong Hanh");

            toast.success('Login thành công');
            dispatch({
                type: FETCH_USER_LOGIN_SUCCESS,
                data: {
                    name: 'Pham Thi Hong Hanh',
                    email: email,
                    token: res.token
                }
            })
        } else {
            if (res && res.status === 400) {
                console.log (res.status);
            }
            toast.error("Login thất bại")
            dispatch({
                type: FETCH_USER_LOGIN_ERROR
            })
        }
    }
}

export const handleLogout = () => {
    return (dispatch, getState) => {
        localStorage.removeItem("email");
        localStorage.removeItem("id");
        localStorage.removeItem("username");
        toast.success('Logout thành công');
        dispatch({
            type: USER_LOGOUT
        })
    }
}

export const handleRefresh = () => {
    return (dispatch, getState) => {
        dispatch({
            type: USER_REFRESH
        })
    }
}

export const User = () => {
    return async (dispatch, getState) => {
        await axios.get('http://localhost:5000/api/v1/users').then ((res) => {
            console.log(res);
        }).catch((error) => {
            console.log(error)
        }
        
        )
    } 
}

