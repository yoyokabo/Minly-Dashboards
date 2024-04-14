
import { Container,  Navbar , Nav, Button} from 'react-bootstrap';
import { Routing } from './Routes';
import "./global.css"
import { HomePage } from './pages/homePage';
import "./styles/NavBar.module.css"
import React, { useState } from 'react';
import { jwtDecode } from "jwt-decode";


interface TokenData{
  _id: string;
  exp: number;
}

const logoutHandler =  () => {
  localStorage.removeItem("token")
  window.location.reload();
}


function App() {
  console.log(HomePage)
  const [logged, setLogged] = useState<boolean>(false);  
  const token = localStorage.getItem("token")
  if (token) {
    const decoded = jwtDecode<TokenData>(token)
    const expires = decoded.exp
    const currentTime = Math.floor(Date.now() / 1000);
    if(currentTime < Number(expires)) {
      if (!logged){
        setLogged(true)}
    }}
 return (
  <Container >
    <Navbar expand="lg" className="navBody" >
  <Container style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
    <Navbar.Brand className='navbar navbar-dark' href="/Home">Minly Share</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav style={{ display: "flex" }} className="navbar navbar-dark">
        <Nav.Link  href="/Home">Home</Nav.Link>
        {!logged &&<Nav.Link href="/Login">Login</Nav.Link>}
        {!logged &&<Nav.Link href="/Register">Register</Nav.Link>}
        {logged &&<Nav.Link href="/Post">Post</Nav.Link>}
        {logged &&<Button  style={{ margin: "7px" }} onClick={(e) => {
                    console.log(e)
                    logoutHandler()}} >Logout</Button>}
      </Nav>
      
    </Navbar.Collapse>
  

  
  </Container>
  </Navbar>
  <Routing/>
  </Container>
  
 ) 
}

export default App;
