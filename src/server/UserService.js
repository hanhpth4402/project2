// import axios from 'axios';
import axios from './customize-axios.js'; //chinh la import intance

const fetchAllUser = (page) => {
    return axios.get(`/api/users?page=${page}`)
}

const postCreateUser = (name, job) => {
    return axios.post("/api/users", {name, job})
}

const putEditUser = (name, job) => {
    return axios.post("/api/users", {name, job})
}

const deleteUser = (id) => {
    return axios.delete(`/api/users/${id}`);
}

const loginApi = (email, password) => {
    return axios.post(`/api/login`, {email, password});
}

const user = () => {
    return axios.get(`/api/v1/users`);
}

const loginHandmade = (email, password) => {
    return axios.post('http://localhost:8082/login', {email, password});
}

const adminLogin = (email, password) => {
    return axios.post('http://localhost:8082/admin/login', {email, password});
}

export {fetchAllUser, postCreateUser, putEditUser, deleteUser, loginApi, user, loginHandmade, adminLogin};