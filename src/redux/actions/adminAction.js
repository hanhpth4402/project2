import { toast } from 'react-toastify';
import { adminLogin } from "../../server/UserService";


export const ADMIN_LOGIN = 'ADMIN_LOGIN';
export const FETCH_ADMIN_LOGIN = 'FETCH_ADMIN_LOGIN';
export const ADMIN_LOGIN_ERROR = 'ADMIN_LOGIN_ERROR';
export const ADMIN_LOGIN_SUCCESS = 'ADMIN_LOGIN_SUCCESS';

export function handleLoginAdmin (email, password) {
    return async (dispatch, getState) => {
        dispatch({type: ADMIN_LOGIN});
        
        let respond = await adminLogin(email, password);
        if (respond && respond.length === 1) {
            let res = respond[0];

            // localStorage.setItem("email", email);
            // localStorage.setItem("id", res.ID_ADMIN);
            // localStorage.setItem("adminName", res.ADMIN);
            
            toast.success('Login thành công');
            dispatch({
                type: ADMIN_LOGIN_SUCCESS,
                data: {
                    id: res.ID_ADMIN,
                    name: res.ADMIN,
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
                type: ADMIN_LOGIN_ERROR
            })
        }


        

    }
}