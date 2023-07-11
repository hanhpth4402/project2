import { useSelector } from "react-redux";
import { USER_LOGIN, FETCH_USER_LOGIN, FETCH_USER_LOGIN_ERROR, FETCH_USER_LOGIN_SUCCESS, USER_REGISTER, 
        FETCH_USER_REGISTER, FETCH_USER_REGISTER_ERROR, FETCH_USER_REGISTER_SUCCESS, USER_LOGOUT, USER_REFRESH } from "../actions/userAction";


const INITIAL_STATE = {
    account: {
        id: '',
        username: '',
        email: '',
        auth: null,
    },
    isLoading: false,
    isError: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_LOGIN:
            return {
                ...state
            }
        
        case FETCH_USER_LOGIN:
            return {
                ...state,
                isLoading: true,
                isError: false
            }

        case FETCH_USER_LOGIN_SUCCESS:
            return {
                ...state,
                account: {
                    id: action.data.id,
                    username: action.data.username,
                    email: action.data.email,
                    auth: true,
                },
                isLoading: false,
                isError: false,
            }

        case FETCH_USER_LOGIN_ERROR:
            return {
                ...state,
                account: {
                    email: '',
                    name: '',
                    auth: null,
                    token: ''
                },
                isLoading: false,
                isError: true
            }
        
        case USER_LOGOUT: 
            return {
                ...state,
                account: {
                    email: '',
                    token: '',
                    auth: false
                },
                isLoading: false,
                isError: false
            }

        case USER_REFRESH:
            return {
                ...state,
                account: {
                    id: localStorage.getItem("id"),
                    username: localStorage.getItem("username"),
                    email: localStorage.getItem("email"),
                    auth: true
                }
            }
        default: return state;
    }
}

export default userReducer;
