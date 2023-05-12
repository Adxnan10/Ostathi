import Container from 'react-bootstrap/Container';
import React, { use, useMemo, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { BsStar, BsStarFill } from 'react-icons/bs'
import { useRouter } from 'next/router'
import { dummyUsers, dummySessions, sessionRating } from '/public/fakeDataBase.json'
import SessionCardFactory from '../../components/session/SessionCardFactory';
import Error from '../error'
import useSWR from 'swr'
import RateUser from './rateUser'
import { useSession } from "next-auth/react"

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function UserPage() {
  const router = useRouter()
  const { userName } = router.query
  const { data, error, isLoading } = useSWR(`/api/user/dashboard?username=${userName}`, fetcher);
  const { data: session, status } = useSession()
  var cond = true;


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
  let rated = false;
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
  const ratings = (data) => {
    let overallRating = 0;
    let overallReviews = 0;
    data.rating.forEach(element => {
      overallRating += element.rating == undefined ? 0 : element.rating;
      overallReviews += element.comment == undefined ? 0 : 1;
    });
    return [Math.round((overallRating / data.rating.length) * 10) / 10, overallReviews]
  }
  if (isLoading || error) {
    return <h1>wait ostahti, we are loading the user's info</h1>
  }
  if (session) {
    const hasRated = data.rating.find(element => element.rater_id == session.user.id)
    if (hasRated) {
      rated = true;
    }
  }
  try {
    return (<>
      <div className="sessionBackGrnd" />
      <Container>
        <Row>
          <Col md="12" lg="8" xl="8" id='sessionDetailsPage'>
            <Row id='overviewTutor'>
              <h5><b>Overvirew</b></h5>
              <p>{data.user.bio}</p>
            </Row>
            <hr />
            <Row className='cardsArea'>
              {data != undefined ? (data.hostSessions.length == 0 ?
                <div className="404-block d-flex justify-content-center align-items-center" style={{ height: '30vh' }}>
                  <h1 style={{ color: "#023047" }}>This user does not host sessions.<span style={{ color: "#F48C06" }}> Ostathi!</span>.</h1>
                </div>
                : data.hostSessions.map((value, index) => <>
                  {index <= 2 ?
                    <Col className='cardMargin' sm="12" md="12" lg="6" xl="6">
                      <SessionCardFactory session={value} post={value.requester_id ? "requested" : 'post'} />
                    </Col>
                    :
                    data.sessions.length > 3 && cond ?
                      <>
                        <Button id='moreSessions' style={{ display: moreButton }} onClick={showMoreSessions}>
                          More Session
                        </Button>
                        {cond = false}
                        <Col sm="12" md="12" lg="6" xl="6" style={{ display: moreSessions }} className='cardMargin'>
                          <SessionCardFactory session={value} post={value.requester_id ? "requested" : 'post'} />
                        </Col>
                      </> : <Col sm="12" md="12" lg="6" xl="6" style={{ display: moreSessions }} className='cardMargin'>
                        <SessionCardFactory session={value} post={value.requester_id ? "requested" : 'post'} />
                      </Col>

                  }
                </>
                )) : "Loading.gif"}
              <Row>
                <Col> <Button id='moreSessions' style={{ display: lessButton }} onClick={showMoreSessions}>
                  Show Less
                </Button></Col>
              </Row>
            </Row>
          </Col>
          <Col>
            <Card id='floatingCard'>
              <Card.Img variant="top" src={data.user.profilePicture} id='tutorPicSD' />
              <Card.Title className='cardHeader'>
                <h2 >{data.user.name}</h2>
                <p style={{ color: 'gray' }} >{data.user.pref_subject}</p>
                <RateUser rater_id={session?.user?.id} tutor_id={data.user.id} hasRated={rated} />
              </Card.Title>
              <hr />
              <Card.Body>
                <div className='ratingBox'>
                  <h4>{ratings(data)[0] || '0'} out of 5</h4>
                  {stars(ratings(data)[0])}
                  <div>{ratings(data)[1]} review</div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>);
  } catch {
    return (<Error />)
  }
}