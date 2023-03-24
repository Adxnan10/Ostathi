import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';


export default function navbar() {
  return (

    <>
           <Navbar expand="lg">
          <Navbar.Brand href="">
            <img src="/Logo.svg" alt="Logo"/>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          
          <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-md`}
              aria-labelledby={`offcanvasNavbarLabel-expand-md`}
              placement="end"
              
            >
            <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>
                  Ostathi
                </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="justify-content-end">
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
          </Offcanvas.Body>
          </Navbar.Offcanvas>
      </Navbar> 
        </> 
  )
}
