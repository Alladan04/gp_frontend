import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useAuth } from '../../hooks/useAuth';
import { useEffect, useState } from 'react';
import "./NavBar.scss"
import Draft from '../Draft/Draft';
import Container from 'react-bootstrap/Container';
import { useDraftRequest } from '../../hooks/useRequest';

type props = {
    request_id: number|null
   };
const MyNavbar = () => {

    const {is_authenticated, is_moderator, user_name, auth} = useAuth()
    
    
    console.log("NAVIGATION", is_authenticated, user_name)
    useEffect(() => {
        auth()
        
    }, []);
    return (
       
        
<Navbar expand="sm" className="bg-body-tertiary" style={{ position:"absolute", backgroundColor:"#ff0057", display:"inline"}} >
   
   <Navbar.Brand>
   <Nav.Link className='nav-link' href={`/operation`}>
       Operations
   </Nav.Link>
   </Navbar.Brand>
   <Navbar.Collapse id="basic-navbar-nav" style = {{ marginLeft:"5%", display:"inline"}}>
   <Nav className="me-auto" style = {{ marginLeft:"5%", display:"inline"}}>
   

   <Link  className = 'nav-link'style = {{ marginLeft:"5%"}} to={`/operation`}>
      Операции
   </Link>


   {is_authenticated && is_moderator &&
   <Nav.Link className = 'nav-link' style = {{ marginLeft:"5%"}} href={`/operation/edit`}>
      Редактировать операции
   </Nav.Link>
   }

   {is_authenticated &&
   <Link className = 'nav-link' style = {{ marginLeft:"5%"}}  to={`/request`}>
       Заявки
   </Link>
   }


   {!is_authenticated && 
       <Link className = 'nav-link'  style = {{ marginLeft:"5%"}}  to={`/login`}>
           Вход
       </Link>
   }      

   {is_authenticated && 
       <Link className = 'nav-link' style = {{ marginLeft:"5%"}}   to={`/profile`}>
           {user_name}
       </Link>
   }   
   {!is_authenticated && 
       <Link className = 'nav-link' style = {{ marginLeft:"5%"}}   to={`/signup`}>
           Регистрация
       </Link>
   }   
    {/*is_authenticated && 
    <Draft request_id={request_id}></Draft>*/}  
   </Nav>
   </Navbar.Collapse>


</Navbar>
         
    )
}

export default MyNavbar


