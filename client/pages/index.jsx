import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import React, {useState } from 'react';
import { dummySessions } from '/public/fakeDataBase.json'
import SessionCardP from '../components/session/SessionCardP'
import Router from 'next/router'


export default function HomePage() {
  const [sessions, setSessoin] = useState([...dummySessions])
  function generateSession(){
    var list = [];
    if(sessions.length > 4){
      for (let index = 0; index < 4; index++) {
        list.push(sessions[index]);
      }
    } else {
        list = [...sessions];
      }
      return(list)
    }
    const classes = [{"subject":"Linear Algebra", "img":"/algebra.png"},{"subject":"Calclus", "img":"/Calclus.png"},{"subject":"Programming", "img":"/programming.png"},
    {"subject":"Project Managment", "img":"/managmanet.png"},{"subject":"Physics", "img":"/physics.png"},{"subject":"Science", "img":"/science.png"},{"subject":"Writing", "img":"/writing.png"},{"subject":"Art", "img":"/art.png"},]
  
  return (
    <div className="App">
        <Row>
          <img id='landingBCKGRN' src="/landingPage.png" alt="Page" />
          <div id='welcoming'>
                    <span style={{color: "#F48C06"}}> Studying </span> online is now much easier
                    <p style={{fontSize: "1vw"}}>Ostathi is an interesting platform that will teach you in more an interactive way</p>
                </div>
        </Row>
        <Row style={{padding:"10vw"}}> 
        <img id='landingBCKGRN' src="/All-in-one.png" alt="All-in-One" />
        </Row>
        <Row>
        <div  className='landingText'> Explore our upcoming <span style={{color: "#F48C06"}}> sessions </span></div>
        </Row>
        <Row id='landingCards'>
        {generateSession().map((value) => <>{
          <Col lg="6" xl="3">
            <SessionCardP session={value}/>
          </Col>
        }</>)}
        </Row>
        <Row>
        <div className='landingText'>Choose Your <span style={{color: "#F48C06"}}> Topic </span></div>
        </Row>
        <Row id='classesLandPage'>
           {classes.map((value) => <>{
            <Col sm="6" md="6" lg="6" xl="3">
          <div id='classLandPage' style={{backgroundImage: `url(${value.img})`}}><div>{value.subject}</div></div>
          </Col>
          }</>)}
        </Row>
        <Row>
        <div className='landingText'>JOIN <span style={{color: "#F48C06"}}> OSTATHI</span> NOW</div>
        </Row>
        <Row style={{margin: "4rem"}}>
          <Col>
          <div id='joinLandPage' style={{backgroundImage: `url(Rectangle1.jpg)`}}>
            <div id='join'>
              <p>
                As a tutor
              </p>
              <Button id='startS' onClick={() => {Router.push(`/postSession`)}}>Start session today</Button>
            </div>
            </div>
          </Col>
          <Col>
          <div id='joinLandPage' style={{backgroundImage: `url(Rectangle2.jpg)`}}>
            <div id='join'><p>As A Student</p> 
            <Button id='joinS' onClick={() => {Router.push(`/searchPage`)}}>Join your collegues</Button>
            </div>
            </div>
          </Col>
        </Row>
    </div>
  );
}