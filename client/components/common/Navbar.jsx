import Container from 'react-bootstrap/Container';
import Link from 'next/link'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';


export default function navbar() {

  return (
    <>
      <Navbar expand="lg" sticky='top' style={{ flexWrap: 'nowrap' }}>
        <Navbar.Brand href="/">
          <img src="/Logo.svg" alt="Logo" style={{ marginLeft: '4rem' }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

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
              <Link href="/postSession" class="nav-item navButton">
                Teach
              </Link>
              <Link href="/requestSession" class="nav-item navButton">
                Learn
              </Link>
              <Link href="/searchPage" class="nav-item navButton">
                Sessions
              </Link>
              <Link href="/searchPage" class="nav-item navButton">
                Tutors
              </Link>
              <Link href="/how" class="nav-item navButton">
                How it works
              </Link>
              {/* <button id="profileSignedIn" class="nav-item btn">
                    <img src={"../../public/Model.jpeg"} alt="Profile Pic" id="navProfilePic"/>
                    <p id="navProfileName">Yazeed</p>
                 </button> */}
              <Link href="/login">
                <input type="button" class="nav-item btn" id="login" value="Login" />
              </Link>
              {/* All links in the navbar are temp for testing.
                The next href should navigate to dashboard
              */}
              <Link href="/dashboard">
                <input type="button" class="nav-item btn" id="signup" value="SignUp" />
              </Link>


            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Navbar>
    </>
  )
}
