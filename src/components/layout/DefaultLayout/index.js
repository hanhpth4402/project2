import { NavLink } from 'react-router-dom';
import './DefaultLayout.scss'
import Header from './Header';
// import { Container } from 'react-bootstrap';
import Sidebar from './Sidebar';

function DefaultLayout ({component, children }) {
    // const subjects = [{
    //     name: 'Toán',
    //     icon: "fa-solid fa-calculator"
    //   }, {
    //     name: 'Vật lý',
    //     icon: "fa-solid fa-gears"
    //   }, {
    //     name: 'Hóa học',
    //     icon: "fa-solid fa-flask-vial"
    //   }, {
    //     name: 'Sinh học',
    //     icon: "fa-solid fa-dna"
    //   }
    //   , {
    //     name: 'Tiếng anh',
    //     icon: "fa-solid fa-spell-check"
    //   }];
    
    return (
        <>
            <Sidebar component = {component}> 
              {children}  
            </Sidebar>
        </>
    )
}

export default DefaultLayout;