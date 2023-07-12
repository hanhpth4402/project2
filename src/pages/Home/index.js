import './Home.scss';
import { ToastContainer } from 'react-toastify';


function Home () {
    
    return (
        <>
            Home



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
    )
}

export default Home;