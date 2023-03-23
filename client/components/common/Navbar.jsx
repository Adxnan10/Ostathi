import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'next/image'

export default function navbar() {
  return (

    <>
           <Navbar expand="lg" className="ms-30">
        <Container>
          
          <Navbar.Brand href="../public/Logo.svg">
           Logo
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="me-2">
                  <a href="" class="nav-item navButton">
                        Teach
                    </a>
                    <a href="" class="nav-item navButton">
                        Learn
                    </a>
                    <a href="" class="nav-item navButton">
                        Sessions
                    </a>
                    <a href="" class="nav-item navButton">
                        Tutors
                    </a>
                    <a href="" class="nav-item navButton">
                        How it works
                    </a>
                    {/* <button id="profileSignedIn" class="nav-item btn">
                    <img src={"../../public/Model.jpeg"} alt="Profile Pic" id="navProfilePic"/>
                    <p id="navProfileName">Yazeed</p>
                 </button> */}
                  <input type="button" class="nav-item btn" id="login" value="Login"/>
                 <input type="button" class="nav-item btn" id="signup" value="SignUp"/>
          </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar> 
        </> 
  )
}
