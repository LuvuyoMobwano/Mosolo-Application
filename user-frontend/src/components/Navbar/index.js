import React from 'react';
import SearchBar from './Search'; // Import the SearchBar component
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtnLink,
} from './NavbarElements';

const Navbar = () => {
  return (
    <>
      <Nav>
        <NavLink to='/'>
          <img src={require('../../assets/Mosolo.png')} alt='logo' style={{ width: "200px", position: "absolute", left: "10px", bottom: "87%" }} />
        </NavLink>
        <Bars />
        <NavMenu>
          <NavLink to='/home' activeStyle>
            Home
          </NavLink>
          <NavLink to='/display-account' activeStyle>
            Account
          </NavLink>
          <NavLink to='/contact-us' activeStyle>
            Contact us
          </NavLink>
          <NavLink to='/logout' activeStyle>
            Logout
          </NavLink>
          <SearchBar /> 
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;