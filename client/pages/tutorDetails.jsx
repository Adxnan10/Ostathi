import Container from 'react-bootstrap/Container';
import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { BsClockHistory, BsGrid } from 'react-icons/bs'
import SessionCardP from '../components/session/SessionCardP'


export default function SessionDetails(){
    var cond = true;
    const rating = [1500,1000,2555,2300,2500]
    var total = 0;
    rating.forEach(element => {
        total =+ element;
    });

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
        title: "A* explained",
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic, voluptate!",
        img: "/logo.svg",
        userName: "Adnan",
        userImg: "/Model.jpeg",
        price: 30
      }]

      const [toggle, setToggle] = useState(true);
      const [moreSessions, setMoreSessions] = useState("none");
      const [lessButton, setLessButton] = useState("none");
      const [moreButton, setMoreButton] = useState("block");
      const showMoreSessions = (() => {
            if(toggle){
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

    return(<>
    <div className="sessionBackGrnd"/>
    <Container>
       <Row>
        <Col lg="8" id='sessionDetailsPage'>
            <Row id='overviewTutor'>
               <h5><b>Overvirew</b></h5>
               <p>Explanation: I think we all know the obvious distinction between these two terms; the word class is singular and the word classes is plural. However, these terms have various meanings depending on the context or discipline in which they are used. unched less than a year ago by Blackboard co-founder Michael Chasen, 
                        The Department of Information and Computer Science offers a BS in Software Engineering. The current
                        program was revised and approved in 2020. The program has been developed considering IEEE/ACM The Department of Information and Computer Science offers a BS in Software Engineering. The current
                        program was revised and approved in 2020. The program has been developed considering IEEE/ACM
                        Software Engineering SE2014 guidelines and meets ABET’s Engineering Accreditation Criteria (EAC). 
                        Software Engineering SE2014 guidelines and meets ABET’s Engineering Accreditation Criteria (EAC). 
                        </p>
            </Row>
            <hr />
            <Row className='cardsArea'>
                {dummySessions.map((value,index) => <>
                    {index <= 1 ? 
                    <Col  sm="12" md="12" lg='6' xl="6" className='cardMargin'><SessionCardP session={value} /></Col>
                    :
                    dummySessions.length > 2 && cond? 
                    <>
                    <Button id='moreSessions' style={{display: moreButton}} onClick={showMoreSessions}>
                        More Session
                    </Button>
                    {cond = false}
                    <Col  style={{display: moreSessions}} sm="12" md="12" lg='6' xl="6"><SessionCardP session={value} /></Col>
                    </> :  <Col  style={{display: moreSessions}} sm="12" md="12" lg='6' xl="6"><SessionCardP session={value} /></Col>
                     }
                </>
                )}
                <Row>
                <Col> <Button id='moreSessions' style={{display: lessButton}} onClick={showMoreSessions}>
                        Show Less
                    </Button></Col>
                </Row>  
            </Row>
        </Col>
        <Col>
            <Card id='floatingCard'>
                <Card.Img variant="top" src="/Model.jpeg" id='tutorPicSD'/>
                <Card.Title className='cardHeader'>
                    <h2 >Adnan Alshehri</h2>
                    <p></p>
                    <Button className="btn btn-primary" id='registerSessionBTN'>
                        Star
                    </Button>
                </Card.Title>
                <hr />
                <Card.Body>
                    <h4 id='titleSesDet'><b>This Instructor has</b></h4>
                    <div id='greyGuarnt'>
                    <div>
                        <p><BsGrid className='BsGrid'/>Honesty and Integrity</p>
                    </div>
                    <div>
                    <p><BsGrid className='BsGrid'/>One-to-One messaging</p>
                    </div>
                    <div>
                        <p><BsGrid className='BsGrid'/>Certification on Math</p>
                    </div>
                    </div>
                    
                </Card.Body>
            </Card>
        </Col>
       </Row>
    </Container>
    </>);
}