import React, { useState, useEffect } from 'react';
import './Sidebar.scss';
import { Button, Collapse } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { handleLogout } from '../../../../redux/actions/userAction';
import Mon_hoc from '../../../../pages/Mon_hoc';

function Sidebar ({component, children}) {
  const [subComponent, setSubComponent] = useState (children);

  // const Subcomponent = Headers;

  const [showHeader, setShowHeader] = useState(true);


  const [isVisible, setIsVisible] = useState(false);

  const mainMenu = [...component];

  const [show, setShow] = useState(false);

  const data = useSelector(state => state.user.account);

  var dispatch = useDispatch();

  const handelLogout = () => {
    dispatch(handleLogout());
  }

  return (
    <>
    <div className={`header-custom`} variant="dark">
        <div className={`header__change`}> 
          <div className={`sidebar__title-before ${show ? 'sidebar__title-after' : null}`}>
            <div className='sidebar__title'>
                <span className='sidebar__title-icon'>
                  <i className='fa-solid fa-image title-icon-inner'></i>
                </span>
                {
                  <div className='sidebar__title-name' style={{display: `${show? 'block' : 'none' }`}}>
                    THI THỬ ONLINE
                  </div>
                }
            </div>
          </div>
          <div 
            className='header__icon-bar' 
            onClick={() => {
              setShow(!show);
              setIsVisible(false);
            }} 
            style={{transform: `${!show ? 'rotate(0deg)' : 'rotate(90deg)'}`}}
          >
            <i 
              className="fa-solid fa-bars" 

            ></i>
          </div>
        </div>
        <div className='header__container'>
          <div className='header__subject'> 
            {/* {   mainMenu[2].submenu.map((item, index) => (
              <NavLink key={`${item} ${index}`} className={'header__subject-item'}>
                <span className='subject_icon'>
                  <i className={`${item.icon} subject_icon-inner`}></i>
                </span>
                <span className='subject__name'>
                  {item.name}
                </span>
              </NavLink>
            ))} */}
          </div>
          { (data.auth !== true) && 
          <div className='container-custom'>
            <NavLink to='/login' className='header__btn btn__login'>
              Đăng nhập
            </NavLink>
            <NavLink to='/register' className='header__btn btn__login'>
              Đăng ký
            </NavLink>
          </div>}

          { (data.auth === true ) && 
          <div className='container-custom'>
            <NavLink to='/bang_diem' className='header__btn btn__login'>
              Bảng điểm
            </NavLink>
          </div>}
        </div>
    </div>
    <aside className={`${show ? 'sidebar__container-full' : null} sidebar__container-short`}>
    <div className={'sidebar__container'}>
      <div className='sidebar__inner'>
        {mainMenu.map ((item, index) =>
              <div className='sidebar__inner-item' key={index}> 
                <NavLink 
                  to={`${item.path === undefined ? '/' : item.path}`}
                  className='sidebar_inner-title nav-link '
                  onMouseOver= {() => {
                    setShow(true);
                  }}
                  onClick={(event) => {
                    if (item.submenu) {
                      setIsVisible(!isVisible);
                      event.preventDefault();
                    };
                  }}
                >
                  <span className='title_icon'>
                    <i className={`${item.icon} title_icon_inner`}></i>
                  </span> 
                  {
                    show &&
                  <div className='title_text'>
                    {item.name}
                  </div>
                  }
                </NavLink>
                {item.submenu &&
                <Collapse in={isVisible} className='sidebar__inner-submenu' id="collapseExample">
                  <ul className='submenu_list'>
                  {item.submenu.map((submenu, sort) => {
                    let link_text = `/mon_hoc?mon_hoc=${submenu.id_subject}`;
                    return (
                      <li>
                        <Link                         
                          className='submenu_item' 
                          key={"submenu" + sort}
                          style={{textDecoration: "none", color: 'white'}}
                          to={link_text}
                        >
                          <span className='submenu_item-icon'>
                            <i className={`${submenu.icon} submenu-icon__inner`}></i>
                          </span>
                          <span className='submenu_item-title'>
                            {submenu.name}
                          </span>
                        </Link>
                      </li>
                    )
                  })}
                  </ul>
                </Collapse>}
              </div>
            )
        }
      { data.auth === true && 
      <div className='sidebar__inner-item-btn-logout'> 
                <div
                  onMouseOver= {() => {
                    setShow(true);
                  }}
                  onClick={() => {
                    handelLogout()
                  }}
                  className={'sidebar_inner-title-btn-logout'}
                >
                  <span className='title_icon-btn-logout'>
                    <i className={`fa-solid fa-image title-icon-inner title_icon_inner-btn-logout title_icon_inner-btn-logout`}/>
                  </span> 
                  {
                    show &&
                  <div className='title_text-btn-logout'>
                    Logout
                  </div>
                  }
                </div>
              </div>
    }
    </div>
    </div>
    </aside>
    <div className={`${show ? 'context-after ' : null} context-default`}> 
        { children }
        {/* <Mon_hoc/> */}
    </div>
    </>
  );
};

export default Sidebar;
