import React from 'react';
import { ToastContainer } from 'react-toastify';
import './TaoDeThi.scss'
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
function DeThi() {

    const [warningEmail, setWarningEmail] = useState()


    return (
        <>
            <div className='taodethi-container' >
                <div className='taodethi-header'>
        
                </div>
                <div className='taodethi-body'>

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
    );
}

export default DeThi;