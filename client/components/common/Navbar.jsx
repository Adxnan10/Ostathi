import Container from 'react-bootstrap/Container';
import Link from 'next/link'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import LoginButton from './LoginButton';

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
              <Link href="/postSession" className="nav-item navButton">
                Teach
              </Link>
              <Link href="/requestSession" className="nav-item navButton">
                Learn
              </Link>
              <Link href="/searchPage" className="nav-item navButton">
                Sessions
              </Link>
              <Link href="/searchPage" className="nav-item navButton">
                Tutors
              </Link>
              <Link href="/how" className="nav-item navButton">
                How it works
              </Link>
              <LoginButton />
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Navbar>
    </>
  )
}
