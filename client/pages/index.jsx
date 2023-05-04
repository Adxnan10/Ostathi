import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { AiFillFileAdd } from 'react-icons/ai'
import { MdGroups } from 'react-icons/md'
import { TfiCreditCard } from 'react-icons/tfi'
import React, { useState } from 'react';
import { dummySessions } from '/public/fakeDataBase.json'
import Router from 'next/router'
import SessionCardFactory from '../components/session/SessionCardFactory';


function FeatureCard({ ...props }) {
  return (
    <div className="feature-card">
      <div className="feature-card-icon" style={{ backgroundColor: props.backgroundColor }}> {props.icon} </div>
      <div className="feature-card-body"><h2> {props.title} </h2> <p> {props.text} </p></div>
    </div>
  )
}
export default function HomePage() {
  const [sessions, setSessoin] = useState([...dummySessions])
  function generateSession() {
    var list = [];
    if (sessions.length > 4) {
      for (let index = 0; index < 4; index++) {
        list.push(sessions[index]);
      }
    } else {
      list = [...sessions];
    }
    return (list)
  }
  function goTosearch() {
    Router.push("/searchPage")
  }
  const classes = [{ "subject": "Linear Algebra", "img": "/algebra.png" }, { "subject": "Calclus", "img": "/Calclus.png" }, { "subject": "Programming", "img": "/programming.png" },
  { "subject": "Project Managment", "img": "/managmanet.png" }, { "subject": "Physics", "img": "/physics.png" }, { "subject": "Science", "img": "/science.png" }, { "subject": "Writing", "img": "/writing.png" }, { "subject": "Art", "img": "/art.png" },]

  return (
    <div className="App">
      <Row>
        <img id='landingBCKGRN' src="/landingPage.png" alt="Page" />
        <div id='welcoming'>
          <span style={{ color: "#F48C06" }}> Studying </span> online is now much easier
          <p style={{ fontSize: "1vw" }}>Ostathi is an interesting platform that will teach you in more interactive way</p>
        </div>
      </Row>
      <Row style={{ padding: "8vw 1vw", justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ color: '#2F327D', fontSize: '2rem', fontWeight: 'bold' }}>Need a help to understand a topic?</h2>
          <p style={{ color: '#696984', fontSize: '1.2rem' }}>Ostathi will connect you with experts in any topic with easy 3 steps</p>
        </div>
        <Col className='d-flex justify-content-center align-items-center'>
          <FeatureCard backgroundColor='#5b72ee' icon={<AiFillFileAdd color='white' size="48px" />} title="Post a session request" text="It’s free and easy to post a session. Simply fill in a title, description and budget and competitive bids come within minutes."></FeatureCard>
        </Col>
        <Col className='d-flex justify-content-center align-items-center'>
          <FeatureCard backgroundColor='#00cbb8' icon={<MdGroups color='white' size="48px" />} title="Choose a tutor" text="Choose from tutors’ bids a tutor that has the needed qualifications and with the best price."></FeatureCard>
        </Col>
        <Col className='d-flex justify-content-center align-items-center'>
          <FeatureCard backgroundColor='#29b9e7' icon={<TfiCreditCard color='white' size="48px" />} title="Pay Safely" text="Only pay for a session when it has been completed using our milestone payment system."></FeatureCard>
        </Col>
        {/* <img id='landingBCKGRN' src="/All-in-one.png" alt="All-in-One" /> */}
      </Row>
      <Row>
        <div className='landingText'> Explore our upcoming <span style={{ color: "#F48C06" }}> sessions </span></div>
      </Row>
      <Row id='landingCards'>
        {/* {generateSession().map((value, index) => <>{
          <Col key={index} xxl={3} xl={4} lg={6} sm={12} >
            <SessionCardFactory session={value}></SessionCardFactory>
          </Col>
        }</>)} */}
        <Button id='moreSessions' onClick={goTosearch}>See more</Button>
      </Row>
      <Row>
        <div className='landingText'>Choose Your <span style={{ color: "#F48C06" }}> Topic </span></div>
      </Row>
      <Row id='classesLandPage'>
        {classes.map((value) => <>{
          <Col sm="6" md="4" lg="4" xl="3">
            <div onClick={goTosearch} id='classLandPage' style={{ cursor: 'pointer', backgroundImage: `url(${value.img})` }}><div class="d-flex align-items-center justify-content-center">{value.subject}</div></div>
          </Col>
        }</>)}
      </Row>
      <Row>
        <div className='landingText'>JOIN <span style={{ color: "#F48C06" }}> OSTATHI</span> NOW</div>
      </Row>
      <Row style={{ margin: "4rem" }}>
        <Col>
          <div id='joinLandPage' style={{ backgroundImage: `url(Rectangle1.jpg)` }}>
            <div id='join'>
              <p>
                As a tutor
              </p>
              <Button id='startS' onClick={() => { Router.push(`/postSession`) }}>Start session today</Button>
            </div>
          </div>
        </Col>
        <Col>
          <div id='joinLandPage' style={{ backgroundImage: `url(Rectangle2.jpg)` }}>
            <div id='join'><p>As A Student</p>
              <Button id='joinS' onClick={() => { Router.push(`/searchPage`) }}>Join your collegues</Button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}