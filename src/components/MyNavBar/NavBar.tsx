//import Container from 'react-bootstrap/Container';
//import Nav from 'react-bootstrap/Nav';
//import Navbar from 'react-bootstrap/Navbar';
import "./NavBar.css"
import {  NavLink } from 'react-router-dom';
function MyNavBar(){
//lolol
     return (
     <>
     <nav className='nav'>
        <div className='nav__wrapper'>
          <div className='nav__links'>
            <NavLink to='/operation' className='nav__link'>BinaryOperations</NavLink>
            <NavLink to='/operation' className='nav__link'>Операции</NavLink>
            <NavLink to='/#' className='nav__link'>Зявки</NavLink>
          </div>
          
     
        <div className='nav__mobile-wrapper' onClick={(event) => event.currentTarget.classList.toggle('active')}>
            <div className='nav__mobile-target' />
            <div className='nav__mobile-menu' onClick={(event) => event.stopPropagation()} >
            <NavLink to='/' className='nav__link'>Главная</NavLink>
            <NavLink to='/items' className='nav__link'>Операции</NavLink>
            <NavLink to='/orders' className='nav__link'>Зявки</NavLink>
            </div>
          </div>
          </div>
       
      </nav>
          
        </>
     )
}

export default MyNavBar