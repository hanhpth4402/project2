// goi instance: loi goi api bao lau thi can cancel;
//cai nay de customize cai axios
//create intance;

///intance:
////// gom cac tham so base url;
////// timeout
////// 


// interceptor:
// moi mot cai request tren server truoc khi dua ve tay nguoi dung thi can gui token
//////xu lis truoc khi data ve tay nguoi dung -> giup data tra nhu hinh thu dung mong muon


////vd: check xem token co het han hay khong
////////neu token het han thi logout;

import axios from "axios";

const instance = axios.create({
    baseURL: 'https://reqres.in',
  });


// Add a response interceptor
instance.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response.data ? response.data : {statusCode: response.status};
  ///tra ve data nhu the nay
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  let res = {}
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    res.data = error.response.data;
    res.status = error.response.status;
    res.headers = error.response.headers;
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser 
    // and an instance of http.ClientRequest in node.js
    console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message);
  }

  return res;
});

export default instance;
