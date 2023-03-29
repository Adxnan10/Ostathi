import Container from 'react-bootstrap/Container';
import React, { use, useMemo, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { BsStar, BsStarFill } from 'react-icons/bs'
import SessionCardP from '../../components/session/SessionCardP'
import { useRouter } from 'next/router'
import { dummyUsers, dummySessions, sessionRating } from '/public/fakeDataBase.json'

export default function UserPage() {
  var cond = true;
  const router = useRouter()
  const { userName } = router.query
  const [users, setUsers] = useState([...dummyUsers]);
  const [sessions, setSessions] = useState([...dummySessions]);
  const [ratings, setRatings] = useState([...sessionRating]);
  const [rating,setRating] = useState([...ratings.filter((rating) => {
    return(
      rating.tutor == userName
    );
  })]);
  const [user,setUser] = useState([...dummyUsers.filter((user) => {
    return(
      user.userName == userName
    );
})]);

  const [session,setSession] = useState([...sessions.filter((session) => {
    return(
      session.userName == userName
    );
  })])

  const stars = (rating) => {
    const starsTags = [];
    const roundedRating = Math.round(rating)
    for (let i = 0; i < roundedRating; ++i) {
      starsTags.push((<BsStarFill color="#fdb022"></BsStarFill>));
    }
    for (let i = 0; i < 5 - roundedRating; ++i) {
      starsTags.push((<BsStar></BsStar>));
    }
    return (
      <div>{starsTags}</div>
    );
    }

  const [toggle, setToggle] = useState(true);
  const [moreSessions, setMoreSessions] = useState("none");
  const [lessButton, setLessButton] = useState("none");
  const [moreButton, setMoreButton] = useState("block");
  const showMoreSessions = (() => {
    if (toggle) {
      setToggle(false);
      setMoreSessions("block");
      setMoreButton("none");
      setLessButton("block");
    } else {
      setMoreSessions("none");
      setMoreButton("block");
      setLessButton("none");
      setToggle(true);
    }
  });

return (<>
    <div className="sessionBackGrnd" />
    <Container>
      <Row>
        <Col lg="8" id='sessionDetailsPage'>
          <Row id='overviewTutor'>
            <h5><b>Overvirew</b></h5>
            <p>{user[0].Bio}</p>
          </Row>
          <hr />
          <Row className='cardsArea'>
            {session.length == 0 ? <h4 style={{marginTop: "4rem"}}>Sorry Ostathi, There is no session at this time!</h4> :
            session.map((value, index) => <>
              {
              index <= 1 ?
                <Col sm="12" md="12" lg='6' xl="6" className='cardMargin'><SessionCardP session={value} /></Col>
                :
                session.length > 2 && cond ?
                  <>
                    <Button id='moreSessions' style={{ display: moreButton }} onClick={showMoreSessions}>
                    More Sessions
                    </Button>
                    {cond = false}
                    <Col style={{ display: moreSessions }} sm="12" md="12" lg='6' xl="6"><SessionCardP session={value} /></Col>
                  </> : <Col style={{ display: moreSessions }} sm="12" md="12" lg='6' xl="6"><SessionCardP session={value} /></Col>
               
              }
            </>
            )}
            <Row>
              <Col> <Button id='moreSessions' style={{ display: lessButton }} onClick={showMoreSessions}>
                Show Less
              </Button></Col>
            </Row>
          </Row>
        </Col>
        <Col>
          <Card id='floatingCard'>
            <Card.Img variant="top" src={user[0].img} id='tutorPicSD' />
            <Card.Title className='cardHeader'>
              <h2 >{user[0].fullName}</h2>
              <p style={{color: 'gray'}} >{user[0].major}</p>
              <Button className="btn btn-primary" id='registerSessionBTN'>
                Star
              </Button>
            </Card.Title>
            <hr />
            <Card.Body>
            <div className='ratingBox'>
            <h4>{user[0].rating} out of 5</h4>
            {stars(user[0].rating)}
            <p style={{margin:"1rem"}}>{rating.length} review</p>
          </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  </>);
}