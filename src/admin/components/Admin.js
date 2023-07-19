
import React, { useState } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import DefaultLayout from '../../components/layout/DefaultLayout';
import { adminPublicRoute, adminPrivateRouter } from '../route/adminRoute';
import TrangChu from '../pages/Home';
import AdminLogin from '../pages/login';
import DeDaTao from '../pages/De_da_tao';
function Admin() {

    const [allComponent, setAllComponent] = useState([...adminPublicRoute]);

    return (
        <>
            <Routes>
                <Route
                    path='/'
                    element={
                        <>1<Outlet/></>
                    }
                        
                    
                >
                    <Route path='login2' element= {<AdminLogin/>}/>
                </Route>
                   
                

                {
                    // allComponent.map((item, index) => {
                    //     let Component = item.component;
                    //     return (
                    //         <Route
                    //             path={item.path}
                    //             key={"page" + index + item.path}
                    //             element={
                    //                 <DefaultLayout component={allComponent}>
                    //                     <Component />
                    //                 </DefaultLayout>
                    //             }
                    //         />
                    //     )
                    // })
                }


                {/* <Route
                    path='/admin/*'
                    element={
                        <h1>not foumd</h1>

                    }
                >
                </Route> */}
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

export default Admin;