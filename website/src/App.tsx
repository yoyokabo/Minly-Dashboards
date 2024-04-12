
import { Container,  Navbar , Nav} from 'react-bootstrap';
import { Routing } from './Routes';
import "./global.css"
import { HomePage } from './pages/homePage';
import "./styles/NavBar.module.css"




function App() {
  console.log(HomePage)
 return (
  <Container >
    <Navbar expand="lg" className="navBody" >
  <Container style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
    <Navbar.Brand className='navbar navbar-dark' href="/Home">Minly Share</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="navbar navbar-dark">
        <Nav.Link  href="/Home">Home</Nav.Link>
        <Nav.Link href="/Login">Login</Nav.Link>
        <Nav.Link href="/Register">Register</Nav.Link>
        <Nav.Link href="/Post">Post</Nav.Link>
      </Nav>
      
    </Navbar.Collapse>
  

  
  </Container>
  </Navbar>
  <Routing/>
  </Container>
  
 ) 
}

export default App;
