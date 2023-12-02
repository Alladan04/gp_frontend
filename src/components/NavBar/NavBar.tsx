import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
function MyNavBar(){
//lolol
     return (
     <>
          <Navbar expand="lg"  bg=" #333"  style={{ maxHeight: '50px', marginBottom :'70px'}} data-bs-theme="dark" >
          <Container >
            <Navbar.Brand href="#home">BinaryOperations</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Link className = "nav-link" to = "/operation">Операции</Link>
                <Link className = "nav-link" to="#link">Заявки</Link>
                
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        </>
     )
}

export default MyNavBar