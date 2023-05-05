import Container from 'react-bootstrap/Container';
import { useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { BsStar, BsStarFill, BsGrid } from 'react-icons/bs'
import ProgressBar from 'react-bootstrap/ProgressBar';
import { useRouter } from 'next/router'
import Router from 'next/router'
import Error from './error'
import { dummyUsers, dummySessions, sessionRating } from '/public/fakeDataBase.json'
import useSWR from 'swr'
import { signIn, useSession } from "next-auth/react"

const fetcher = (...args) => fetch(...args).then((res) => res.json()) // To be called by useSWR

//Provide Rating, Pics, Session Details, Dates, Names, etc.

export default function SessionDetails() {
  const { data: userSession } = useSession()
  const [isAttendee, setIsAttendee] = useState(false)
  const [rate, setRate] = useState("none");
  const [overview, setOverview] = useState('block')
  const [OVB, setOVB] = useState("")

  const router = useRouter()
  const { session_id, session_type } = router.query
  const { data, error, isLoading } = useSWR(`/api/sessions/loadSession?session_id=${session_id}&session_type=${session_type}`, fetcher) // Fetches data from the API
  let user_id = session_type == "post" ? data?.session.tutor_id : data?.session.requester_id
  const { data: sessionInfo, isLoading: LoadingSessionInfo } = useSWR(`/api/sessions/loadSessionInfo?session_id=${session_id}&session_type=${session_type}&user_id=${user_id}`, fetcher) // Fetches data from the API
  const [sessions, setSessions] = useState([...dummySessions]);
  //const [ratings, setRatings] = useState([...sessionRating]);

  if (isLoading || LoadingSessionInfo) {
    console.log(data)
    return <h1> Loading . </h1>
  }
  if (error) {
    console.log(error)
    return <h1> something went wrong . </h1>
  }


  const session = data.session
  const ratings = data?.rating

  function calcRates() {
    const totalRating = [0, 0, 0, 0, 0];
    ratings.forEach((e) => {
      if (e.rating == 1) {
        totalRating[0] = totalRating[0] + 1
      } else if (e.rating == 2) {
        totalRating[1] = totalRating[1] + 1
      } else if (e.rating == 3) {
        totalRating[2] = totalRating[2] + 1
      } else if (e.rating == 4) {
        totalRating[3] = totalRating[3] + 1
      } else if (e.rating == 5) {
        totalRating[4] = totalRating[4] + 1
      }
    });
    return (totalRating);
  }
  const totalRating = calcRates();

  function total() {

    var total = 0;
    for (let index = 0; index < ratings.length; index++) {
      total += ratings[index].rating;
    }
    return (ratings.length == 0 ? 0 : total / (ratings.length))
  }


  const stars = (rating) => {
    const starsTags = [];
    const roundedRating = Math.round(rating)
    for (let i = 0; i < roundedRating; ++i) {
      starsTags.push((<BsStarFill color="#fdb022"></BsStarFill>));
    }
    for (let i = 0; i < 5 - roundedRating; ++i) {
      starsTags.push((<BsStar color="gray"></BsStar>));
    }
    return (
      <div>{starsTags}</div>
    );
  }


  const rateView = (e) => {
    total();
    setRate("block");
    setOverview("none");
    e.currentTarget.classList.add("activeButtonDS");
    e.currentTarget.previousSibling.classList.remove("activeButtonDS")
  }
  const overViewView = (e) => {
    setOverview("block");
    setRate("none");
    e.currentTarget.classList.add("activeButtonDS");
    e.currentTarget.nextSibling.classList.remove("activeButtonDS")
  }
  try {
    return (
      <>
        <div className="sessionBackGrnd" />
        <Container>
          <Row>
            <Col sm="12" md="8" id='sessionDetailsPage'>
              <Row>
                <Col lg="8" xl="6" className='buttonSession'>
                  <Button className="optionSessionPage activeButtonDS" onClick={overViewView}>
                    Overview
                  </Button>
                  <Button className="optionSessionPage" onClick={rateView}>
                    Rating
                  </Button>
                </Col>

              </Row>
              <Row>
                <div id='sessionDescription'>
                  <div className='sessionOverview' style={{ display: overview }}>
                    <Row>
                      <div className='datailsSession'>
                        <div className='datailsSession'>
                          <img src={sessionInfo.user[0].profilePicture == undefined ? "Profile.png" : sessionInfo.user[0].profilePicture} alt="Model" id='sessionPics' />
                          {<p id='nameSessionDet'>{sessionInfo.user[0].name}</p >}
                        </div>
                        <div className='datailsSession'>
                          <BsGrid className='BsGrid' />
                          <p>&ensp;4th of May 2022</p>
                        </div>
                      </div>
                    </Row>
                    <Row className='datailsSession'>
                      <p>{session.description}</p>
                    </Row>
                  </div>
                  <div className='sessionRating' style={{ display: rate }}>
                    <Row>
                      <Col sm="12" md="6" lg="4" xlg="4">
                        <div className='ratingBox'>
                          <h4>{Math.round(total() / ratings.length * 10) / 10} out of 5</h4>
                          {stars(total())}
                          <p>{ratings.length} reviews</p>
                        </div>
                      </Col>
                      <Col>
                        <div className='ratingBars'>
                          {totalRating.map((value, index) => {
                            return (
                              <Row>
                                <Col md="6" lg="2">
                                  <p>{index + 1} stars</p>
                                </Col>
                                <Col>
                                  <div className='ratingBar'><ProgressBar variant='warning' className='ratingBar' now={(value / ratings.length) * 100} /></div>
                                </Col>
                              </Row>
                            );
                          })
                          }
                        </div>
                      </Col>
                    </Row>
                    {ratings.map((value, index) => {
                      return (
                        <><Row>
                          <div className='datailsSession'>
                            <div className='datailsSession'>
                              <img src={sessionInfo.user[0].profilePicture == undefined ? "Profile.png" : sessionInfo.user[0].profilePicture} alt="Model" id='sessionPics' />
                              <p id='nameSessionDet'>{value.name}</p >
                            </div>
                            <div className='datailsSession'>
                              <BsGrid className='BsGrid' />
                              <p>&ensp;{value.date}</p>
                            </div>
                          </div>
                        </Row>
                          <Row className='datailsSession'>
                            <p>{value.comment}
                            </p>
                          </Row>
                          {ratings.length - index - 1 == 0 ? <></> : <hr />}
                        </>
                      );
                    })}
                  </div>
                </div>
              </Row>
            </Col>
            <Col>
              <Card id='floatingCard'>
                <Card.Img variant="top" src="/Model.jpeg" id='tutorPicSD' />
                <Card.Title className='cardHeader'>
                  <h2 >{session_type == "post" ? session.price : session.startBid} SAR</h2>
                  <p>{data.attendees.length} joined! </p>
                  <Button className="btn btn-primary" id='registerSessionBTN' onClick={() => {
                    Router.push(data?.attendees?.filter((att) =>
                      att.id == userSession?.user?.id
                    ).length == 1 ? `session/room/session?session_id=${session_id}&session_type=${session_type}` : `/payment/${session_id}`)
                  }}>
                    {data?.attendees?.filter((att) =>
                      att.id == userSession?.user?.id
                    ).length == 1 ? 'Enter session' : session_type == "post" ? 'Register' : 'Bid'}
                  </Button>
                </Card.Title>
                <hr />
                <Card.Body>
                  <h4 id='titleSesDet'><b>{session.title}</b></h4>
                  <div id='greyGuarnt'>
                    <div>
                      <p><BsGrid className='BsGrid' />{sessionInfo.subjects.map((subject, index) => {
                        return (<span key={subject.id}>
                          {subject.name}{sessionInfo.subjects.length - index - 1 == 0 ? <></> : <span>, </span>}
                        </span>)
                      })}</p>
                    </div>
                    <div>
                      <p><BsGrid className='BsGrid' />{session.type || 'one-one'}</p>
                    </div>
                    <div>
                      <p><BsGrid className='BsGrid' />{session.duration} mins</p>
                    </div>
                  </div>

                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </>);
  } catch (e) {
    return (<>{e.message}</>)
  }
}