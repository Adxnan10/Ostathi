
import SessionCardP from '../components/session/SessionCardP'
import SessionCardR from '../components/session/SessionCardR'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function HomePage() {
  const dummySessions = [{
    topic: "Math",
    duration: "2 hours",
    title: "Linear Algebra",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic, voluptate!",
    img: "/Model.jpeg",
    userName: "Yzd",
    userImg: "/logo.svg",
    price: 20
  },
  {
    topic: "Algorithms",
    duration: "1 hour",
    title: "A* explained",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic, voluptate!",
    img: "/logo.svg",
    userName: "Adnan",
    userImg: "/Model.jpeg",
    price: 30
  }
  ];
  return (
    <div className="App">
      <Container>
        <Row>
          <Col><SessionCardP session={dummySessions[0]} /></Col>
          <Col><SessionCardP session={dummySessions[1]} /></Col>
          <Col><SessionCardR session={dummySessions[1]} /></Col>
        </Row>

      </Container>
    </div>
  );
}