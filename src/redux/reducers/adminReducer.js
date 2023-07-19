
import { ADMIN_LOGIN, ADMIN_LOGIN_SUCCESS, ADMIN_LOGIN_ERROR } from "../actions/adminAction";

const INITIAL_STATE = {
    account: {
        id: '',
        name: '',
        email: '',
        auth: null,
    },
    isLoading: false,
    isError: false,
};

const adminReducer = (state =INITIAL_STATE, action) => {
    switch (action.type) {
        case ADMIN_LOGIN:
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        
        case ADMIN_LOGIN_SUCCESS:
            return {
                ...state,
                account: {
                    id: action.data.id,
                    name: action.data.name,
                    email: action.data.email,
                    auth: true,
                },
                isLoading: false,
                isError: false,
            }
        
        case ADMIN_LOGIN_ERROR:
            return {
                ...state,
                account: {
                    id:'',
                    email: '',
                    name: '',
                    auth: null,
                },
                isLoading: false,
                isError: true
            }
    
        default: return state;
    }
}

export default adminReducer