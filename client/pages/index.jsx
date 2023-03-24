import React, { useEffect, useState } from 'react'
import SessionCardP from '../components/session/SessionCardP'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function HomePage() {
  const [userData, setUserData] = useState({});
  useEffect(() => {
    fetch("http://localhost:3001/home")
      .then(res => res.json())
      .then(data => setUserData(data));
  }, []);
  return (
    <div className="App">
      {
        typeof userData === 'undefined' ? (<p>Loading..</p>) :
          (<h1>Hi {userData.username}</h1>)
      }
      <Container>
        <Row>
          <Col><SessionCardP title="Adnan" /></Col>
          <Col><SessionCardP title="Yzd" /></Col>
          <Col><SessionCardP title="Ahmad" /></Col>
        </Row>

      </Container>
    </div>
  );
}