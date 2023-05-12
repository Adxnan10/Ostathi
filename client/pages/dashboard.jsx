import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import SessionCardFactory from '../components/session/SessionCardFactory'
import { BsStar, BsStarFill } from "react-icons/bs";
import React, { useEffect, useState } from "react";
import Router from 'next/router'
import useSWR from 'swr'
import { useSession } from "next-auth/react"
import Error from "./error"


const fetcher = (...args) => fetch(...args, {method: "GET"}).then((res) => res.json())

export default function DashBoard() {
  const { data: session, status } = useSession()
  const { data, error, isLoading } = useSWR([`/api/user/dashboard?username=${session?.user?.username}&id=${session?.user?.id}`], fetcher);
  const [toggle, setToggle] = useState(true);
  const [moreSessions, setMoreSessions] = useState("none");
  const [lessButton, setLessButton] = useState("none");
  const [moreButton, setMoreButton] = useState("block");
  const [toggle2, setToggle2] = useState(true);
  const [moreSessions2, setMoreSessions2] = useState("none");
  const [lessButton2, setLessButton2] = useState("none");
  const [moreButton2, setMoreButton2] = useState("block");

  if(status === "authenticated") {

  var cond = true;
  var cond2 = true;
  const goToEditPage = () => {
    Router.push(`/editProfile?username=${session?.user?.username}`)
  }

  
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
  const showMoreSessions2 = (() => {
    if (toggle2) {
      setToggle2(false);
      setMoreSessions2("block");
      setMoreButton2("none");
      setLessButton2("block");
    } else {
      setMoreSessions2("none");
      setMoreButton2("block");
      setLessButton2("none");
      setToggle2(true);
    }
  });

  const ratings = (data) => {
    let overallRating = 0;
    let overallReviews = 0;
    data.rating.forEach(element => {
      overallRating += element.rating == undefined ? 0 : element.rating;
      overallReviews += element.comment == undefined ? 0 : 1;
    });
    return [Math.round((overallRating / data.rating.length) * 10)/ 10, overallReviews]
  }

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
      <div style={{ margin: "1rem" }}>{starsTags}</div>
    );
  }
  return (<>
    <Row id='dashboardPage'>
      <Col lg="9" xl="9">
        <Row>
          <h4>Enrolled Sessions</h4>
        </Row>
        <Row className='cardsArea' >
          {data != undefined ? (data.sessions.length == 0 ? 
          <div className="404-block d-flex justify-content-center align-items-center" style={{ height: '30vh' }}>
    <h1 style={{ color: "#023047" }}>You didn't register in any session<span style={{ color: "#F48C06" }}> Ostathi!</span>.</h1>
    </div>
            :data.sessions.map((value, index) => <>
            {index <= 2 ?
              <Col className='cardMargin' sm="12" md="6" lg="6" xl="4">
                <SessionCardFactory session={value} post={value.requester_id ? "requested": 'post'} />
              </Col>
              :
              data.sessions.length > 3 && cond ?
                <>
                  <Button id='moreSessions' style={{ display: moreButton }} onClick={showMoreSessions}>
                    More Session
                  </Button>
                  {cond = false}
                  <Col sm="12" md="6" lg="6" xl="4" style={{ display: moreSessions }} className='cardMargin'>
                    <SessionCardFactory session={value} post={value.requester_id ? "requested": 'post'} />
                  </Col>
                </> : <Col sm="12" md="6" lg="6" xl="4"style={{ display: moreSessions }} className='cardMargin'>
                  <SessionCardFactory session={value} post={value.requester_id ? "requested": 'post'} />
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
        <Row id='tutorsArea'>
          <Row>
            <h4>My Hosted  Sessions</h4>
          </Row>
          <Row>
          {data != undefined ? (data.hostSessions.length == 0 ? 
          <div className="404-block d-flex justify-content-center align-items-center" style={{ height: '30vh' }}>
    <h1 style={{ color: "#023047" }}>You don't host any session<span style={{ color: "#F48C06" }}> Ostathi!</span>.</h1>
    </div>
            : data.hostSessions.map((value, index) => <>
            {index <= 2 ?
              <Col className='cardMargin' sm="12" md="6" lg="6" xl="4">
                <SessionCardFactory session={value} post={value.requester_id ? "requested": 'post'} />
              </Col>
              :
              data.sessions.length > 3 && cond2 ?
                <>
                  <Button id='moreSessions' style={{ display: moreButton2 }} onClick={showMoreSessions2}>
                    More Session
                  </Button>
                  {cond2 = false}
                  <Col sm="12" md="6" lg="6" xl="4" style={{ display: moreSessions2 }} className='cardMargin'>
                    <SessionCardFactory session={value} post={value.requester_id ? "requested": 'post'} />
                  </Col>
                </> : <Col sm="12" md="6" lg="6" xl="4"style={{ display: moreSessions2 }} className='cardMargin'>
                  <SessionCardFactory session={value} post={value.requester_id ? "requested": 'post'} />
                </Col>

            }
          </>
          )) : "Loading.gif"}
          <Row>
            <Col> <Button id='moreSessions' style={{ display: lessButton2 }} onClick={showMoreSessions2}>
              Show Less
            </Button></Col>
          </Row>

          </Row>
          <Row>
          </Row>
        </Row>
      </Col>
      <Col>
        <Row>
          <img src={data?.user?.profilePicture == undefined ? "Profile.png" : data.user?.profilePicture} alt="Model" id='dashPic' />
        </Row>
        <Row>
          <h5>{data == undefined ? "loading" : data.user?.name}</h5>
        </Row>
        <Row>
          <Button id="dashButton" onClick={goToEditPage}>
            Edit Profile
          </Button>
        </Row>
        <Row>
          <div className='ratingBox'>
            <h4>{data == undefined ? "..." : !ratings(data)[0] ? 0 : ratings(data)[0]} out of 5</h4>
            {data == undefined ? stars(0) : stars(ratings(data)[0])}
            <div>{data == undefined ? "..." : ratings(data)[1]} review</div>
          </div>

        </Row>
      </Col>
    </Row>
  </>);}
  else {
    return(<div className="404-block d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
    <h1 style={{ color: "#023047" }}>You Are not Signed in<span style={{ color: "#F48C06" }}> Ostathi!</span>.</h1>
    </div>)
  }
}