import Container from 'react-bootstrap/Container';
import { useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert'
import Card from 'react-bootstrap/Card';
import { BsStar, BsStarFill, BsGrid } from 'react-icons/bs'
import ProgressBar from 'react-bootstrap/ProgressBar';
import { useRouter } from 'next/router'
import Router from 'next/router'
import Error from './error'
import useSWR from 'swr'
import { useSession } from "next-auth/react"

const fetcher = (...args) => fetch(...args).then((res) => res.json()) // To be called by useSWR

//Provide Rating, Pics, Session Details, Dates, Names, etc.

export default function SessionDetails() {
  const { data: userSession } = useSession()
  const [alertBlcok, setAlert] = useState('none')
  const [alertContent, setContent] = useState('none')
  const [alertVar, setVar] = useState('none')
  const [rate, setRate] = useState("none");
  const [overview, setOverview] = useState('block')
  const [biddersBlock, setBiddersBlock] = useState("none")
  const router = useRouter()
  const { session_id, session_type } = router.query
  const { data, error, isLoading } = useSWR(`/api/sessions/loadSession?session_id=${session_id}&session_type=${session_type}`, fetcher) // Fetches data from the API
  let user_id = session_type == "post" ? data?.session.tutor_id : data?.session.requester_id
  const { data: sessionInfo, isLoading: LoadingSessionInfo } = useSWR(`/api/sessions/loadSessionInfo?session_id=${session_id}&session_type=${session_type}&user_id=${user_id}`, fetcher) // Fetches data from the API
  const { data: biddersData } = useSWR(`/api/sessions/biddingHandler?session_id=${session_id}`, fetcher) // Fetches data from the API
  if (isLoading || LoadingSessionInfo) {
    return <h1> Loading . </h1>
  }
  if (error) {
    return <div className="404-block d-flex justify-content-center align-items-center" style={{ height: '65vh' }}>
      <h1 style={{ color: "#023047" }}>Error Has Occured<span style={{ color: "#F48C06" }}> Ostathi!</span>.</h1>
    </div>
  }


  const session = data.session
  const ratings = data?.rating
  const subjects = sessionInfo.subjects
  const subject = subjects[0]?.name          // main subject of the session
  const class_images = {
    "math": "/math.png", "programming": "/programming.png", "algorithms": "/programming.png",
    "physics": "/physics.png", "data structures": "/programming.png", "medicine": "/medicine.png"
  }


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

  const owner = session?.requester_id == userSession?.user?.id
  const checkAttendee = () => {
    if (!userSession)
      return false
    return (session?.requester_id == userSession?.user?.id
      || session?.tutor_id == userSession?.user?.id
      || data?.attendees?.filter((att) =>
        att.id == userSession?.user?.id
      ).length == 1)
  }
  const rateView = (e) => {
    total();
    setRate("block");
    setOverview("none");
    setBiddersBlock("none")
    e.currentTarget.parentNode.childNodes.forEach(node => node.classList.remove("activeButtonDS")) //previousSibling.classList.remove("activeButtonDS")
    e.currentTarget.classList.add("activeButtonDS");
  }
  const overViewView = (e) => {
    setOverview("block");
    setRate("none");
    setBiddersBlock("none")
    e.currentTarget.parentNode.childNodes.forEach(node => node.classList.remove("activeButtonDS"))
    e.currentTarget.classList.add("activeButtonDS");
  }

  const biddersView = (e) => {
    setOverview("none");
    setRate("none");
    setBiddersBlock("block")
    e.currentTarget.parentNode.childNodes.forEach(node => node.classList.remove("activeButtonDS"))
    e.currentTarget.classList.add("activeButtonDS");
  }

  const chooseBid = (user_id, session_id) => {
    fetch(`/api/sessions/chooseBidder?user_id=${user_id}&session_id=${session_id}`, {
      method: 'PUT',
    }).then(response => response.json())
      .then(data => {
        if (data.error) {
          setAlert("block")
          setVar("danger")
          setContent(data.error)
        } else {
          setAlert("block")
          setVar("success")
          setContent("Offer Has Been Choosen")
          setTimeout(() => { Router.reload(window.location.pathname) }, 4000);
        }
      })
  }
  const placeBid = () => {
    if (!userSession) {
      setAlert("block")
      setVar("danger")
      setContent("You are not Signed In")
      return;
    }
    const price = prompt("Please enter your Offer price")
    if (price != null) {
      fetch(`/api/sessions/placeBid?session_id=${session.id}&price=${price}&user_id=${userSession.user.id}`, {
        method: 'PUT',
      }).then(response => response.json())
        .then(data => {
          if (data.error) {
            setAlert("block")
            setVar("danger")
            setContent(data.error)
          } else {
            setAlert("block")
            setVar("success")
            setContent("Offer Has Been Placed")
            setTimeout(() => { Router.reload(window.location.pathname) }, 3000);
          }
        })
    }
  }

  try {
    return (
      <>
        <div className="sessionBackGrnd" />
        <Container>
          <div style={{ margin: "2rem 30vw 0 0", display: alertBlcok }}>
            <Alert variant={alertVar} onClose={() => { setAlert("none") }} dismissible>{alertContent}</Alert>
          </div>
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
                  {session_type == "requested" && <Button className="optionSessionPage" onClick={biddersView}>
                    Offered by
                  </Button>}
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
                          <p>&ensp;{session.Date}</p>
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
                          <h4>{!Math.round(total() * 10) / 10 ? 0 : Math.round(total() * 10) / 10} out of 5</h4>
                          {stars(total())}
                          <p>{ratings.length} reviews</p>
                        </div>
                      </Col>
                      <Col>
                        <div className='ratingBars'>
                          {totalRating.map((value, index) => {
                            return (
                              <Row key={index}>
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
                              <img src={value.profilePicture == undefined ? "Profile.png" : value.profilePicture} alt="Model" id='sessionPics' />
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
                  <div className='biddersView' style={{ display: biddersBlock }}>
                    {biddersData.bidders.length == 0 ?
                      <p>
                        No tutors has offered
                      </p>
                      : biddersData?.bidders?.map((value, index) => {
                        return (
                          <>
                            <Row>
                              <div className='datailsSession'>
                                <div className='datailsSession'>
                                  <img src={value.profilePicture == undefined ? "Profile.png" : value.profilePicture} alt="Model" id='sessionPics' />
                                  <p id='nameSessionDet'>{value.name}</p >
                                </div>
                                <div className='datailsSession d-flex justify-content-center align-items-center'>
                                  <span> Bid Value: {value.bid}
                                  </span>
                                  {!session.currentBid && owner &&
                                    <Button variant='success' style={{ margin: '0px 10px' }} onClick={() => chooseBid(value.id, value.session_id)}>Choose</Button>
                                  }
                                  {session.tutor_id == value.id && <Button variant='success' disabled="true" style={{ margin: '0px 10px' }} >CHOSEN TUTOR</Button>}
                                </div>
                              </div>
                            </Row>
                            {/* <Row className='datailsSession'>
                            
                          </Row> */}
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
                <Card.Img variant="top" id='tutorPicSD' src={subject in class_images ? class_images[subject] : "/default_class.png"} alt={subject in class_images ? subject + " icon" : "default session icon"} />
                <Card.Title className='cardHeader'>
                  <h2 >{session_type == "post" ? session.price : session.currentBid ? session.currentBid : session.startBid} SAR</h2>
                  <p>{data.attendees.length} joined! </p>
                  <Button className="btn btn-primary" id='registerSessionBTN' onClick={() => {
                    if (session_type == "post")
                      Router.push(checkAttendee() ? `session/room/session_room?session_id=${session_id}&session_type=${session_type}` : `/payment/${session_id}`)
                    else {
                      if (checkAttendee() == true)
                        Router.push(
                          `session/room/session_room?session_id=${session_id}&session_type=${session_type}`)
                      else
                        placeBid()
                    }
                  }} disabled={!userSession || (!checkAttendee() && session?.currentBid)} >
                    {checkAttendee() ? 'Enter session' : session_type == "post" ? 'Register' : session?.currentBid ? 'Offers Ended' : 'Offer'}
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