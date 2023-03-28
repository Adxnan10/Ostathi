import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import UserCard from '../components/user/UserCard'
import Button from 'react-bootstrap/Button'
import SessionCardP from '../components/session/SessionCardP'
import { BsStar, BsStarFill } from "react-icons/bs";
import React, { useState } from "react";


export default function DashBoard() {
  var cond = true;

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
  },
  {
    topic: "Algorithms",
    duration: "1 hour",
    title: "xplained",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic, voluptate!",
    img: "/logo.svg",
    userName: "Adnan",
    userImg: "/Model.jpeg",
    price: 30
  },
  {
    topic: "rkjsfhd",
    duration: "1 hour",
    title: " explained",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic, voluptate!",
    img: "/logo.svg",
    userName: "Adnan",
    userImg: "/Model.jpeg",
    price: 30
  },
  {
    topic: "rkjsfhd",
    duration: "1 hour",
    title: " explained",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic, voluptate!",
    img: "/logo.svg",
    userName: "Adnan",
    userImg: "/Model.jpeg",
    price: 30
  }]
  const dummyUsers = [{
    fullName: "Yzd",
    img: "/Model.jpeg",
    rating: 3,
    major: "Physics"
  }];

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
          <h4>My Sessions</h4>
        </Row>
        <Row className='cardsArea' >
          {dummySessions.map((value, index) => <>
            {index <= 2 ?
              <Col className='cardMargin' lg="4"><SessionCardP session={value} /></Col>
              :
              dummySessions.length > 3 && cond ?
                <>
                  <Button id='moreSessions' style={{ display: moreButton }} onClick={showMoreSessions}>
                    More Session
                  </Button>
                  {cond = false}
                  <Col lg="4" style={{ display: moreSessions }} className='cardMargin'><SessionCardP session={value} /></Col>
                </> : <Col lg="4" style={{ display: moreSessions }} className='cardMargin'><SessionCardP session={value} /></Col>

            }
          </>
          )}
          <Row>
            <Col> <Button id='moreSessions' style={{ display: lessButton }} onClick={showMoreSessions}>
              Show Less
            </Button></Col>
          </Row>


        </Row>
        <Row id='tutorsArea'>
          <Row>
            <h4>Starred Tutors</h4>
          </Row>
          <Row>
            <Col>
              <UserCard user={dummyUsers[0]} />
            </Col>

          </Row>
          <Row>
          </Row>
        </Row>
      </Col>
      <Col>
        <Row>
          <img src="Model.jpeg" alt="Model" id='dashPic' />
        </Row>
        <Row>
          <h5>Adnan</h5>
        </Row>
        <Row>
          <Button id="dashButton">
            Edit Profile
          </Button>
        </Row>
        <Row>
          <div className='ratingBox'>
            <h4>4 out of 5</h4>
            {stars(4)}
            <p>3450 review</p>
          </div>

        </Row>
      </Col>
    </Row>
  </>);
}