
import SessionCardP from '../components/session/SessionCardP'
import SessionCardR from '../components/session/SessionCardR'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function HomePage() {
  return (
    <div className="App">
        <Row >
          <img id='landingBCKGRN' src="/landingPage.png" alt="Page" />
          <p className="login-main-phrase" id='welcoming'>
                    <span style={{color: "#F48C06"}}> Studying </span> online is now much easier
                </p>
        </Row>
    </div>
  );
}