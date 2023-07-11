import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import DefaultLayout from './components/layout/DefaultLayout';
import { publicRoutes, privateRoutes } from './route';
import Home from './pages/Home';
import Header from './components/layout/DefaultLayout/Header';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react'
import { USER_REFRESH, User, handleRefresh } from './redux/actions/userAction';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-bootstrap';
import { hoc_phan } from './route';
import { test } from './route';
import TestLayout from './components/layout/TestLayout';
import { loginHandmade } from './server/UserService';
import axios from './server/customize-axios'; 
import Bang_diem from './pages/Bang_diem';
import Chi_tiet from './pages/Bang_diem/Bang_diem_chi_tiet';
import ChiTiet from './pages/Bang_diem/Bang_diem_chi_tiet';

function App() {
  const data = useSelector(state => state.user);

  const [allComponent, setAllComponent] = useState([...publicRoutes]);

  const dispatch = useDispatch();

  async function getLoginHandmade () {
    let abc = await axios.post('http://localhost:8082/login', {email: 'user@gmail.com', password: '123456'});
    console.log(abc);
  }

  useEffect (function () {
    if (localStorage.getItem("id")) {
      dispatch(handleRefresh());
    };
  }, [])
 
  var navigator = useNavigate();
  useEffect (() => {
    if (data.account.auth === true) {
      // navigator('/');
      setAllComponent([...privateRoutes]);
    }

    if (data.account.auth !== true && data.isError !== true) {
      // navigator('/');
      setAllComponent([...publicRoutes]);
    }

  }, [data.account])


    // dispatch(User());

  return (
      <>
        <Routes>
          {
            allComponent.map((item, index) => {
              let Component = item.component;
              return (
                <Route
                  path={item.path}
                  key={"page" + index + item.path}
                  element={
                    <DefaultLayout component = {allComponent}>
                      <Component/>
                    </DefaultLayout>
                  } 
                />
              )
            })
          }
          {
            hoc_phan.map((item, index) => {
              let Component = item.component;
              return (
                <Route 
                  key={index}
                  path={item.path}
                  element ={
                    <DefaultLayout component = {allComponent}>
                      <Component/>
                    </DefaultLayout>
                  }  
                >

                </Route>
              )
            })
          } 

          {
            data.account.auth && test.map ((item, index) => {
              let Component = item.component;
              return (
                <>
                <Route
                  key = {index}
                  path={item.path}
                  element = {
                    <Component/>
                  }>

                  </Route>

                <Route path="/bang_diem/:id" element={
                  <DefaultLayout component = {allComponent}>
                      <ChiTiet/>
                  </DefaultLayout>
                } />
                </>
              )
            })
          }
            <Route
              path='/*'
              element = {
                <h1>NOT FOUND</h1>
              }
            >
            </Route>
        </Routes>
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
  );
}

export default App;
