import Container from 'react-bootstrap/Container';
import { useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { BsClockHistory, BsGrid } from 'react-icons/bs'
import ProgressBar from 'react-bootstrap/ProgressBar';

//Provide Rating, Pics, Session Details, Dates, Names, etc.

export default function SessionDetails() {
  const rating = [3, 5, 8, 1, 5]
  var total = 0;
  rating.forEach(element => {
    total += element;
  });
  const comments = [{
    name: "Yazeed",
    comment: "Nice tutor",
    date: "May 24, 2022"
  }, {
    name: "Yazeed",
    comment: "Nice tutor",
    date: "May 24, 2022"
  }]
  const [rate, setRate] = useState("none");
  const [overview, setOverview] = useState('block')
  const [OVB, setOVB] = useState("")
  const rateView = (e) => {
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
  return (<>
    <div className="sessionBackGrnd" />
    <Container>
      <Row>
        <Col lg="8" id='sessionDetailsPage'>
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
                      <img src="/Model.jpeg" alt="Model" id='sessionPics' />
                      <p id='nameSessionDet'>Yazeed</p >
                    </div>
                    <div className='datailsSession'>
                      <BsGrid className='BsGrid' />
                      <p>&ensp;4th of May 2022</p>
                    </div>
                  </div>
                </Row>
                <Row className='datailsSession'>
                  <p>Explanation: I think we all know the obvious distinction between these two terms; the word class is singular and the word classes is plural. However, these terms have various meanings depending on the context or discipline in which they are used. unched less than a year ago by Blackboard co-founder Michael Chasen,
                    The Department of Information and Computer Science offers a BS in Software Engineering. The current
                    program was revised and approved in 2020. The program has been developed considering IEEE/ACM The Department of Information and Computer Science offers a BS in Software Engineering. The current
                    program was revised and approved in 2020. The program has been developed considering IEEE/ACM
                    Software Engineering SE2014 guidelines and meets ABET’s Engineering Accreditation Criteria (EAC).
                    Software Engineering SE2014 guidelines and meets ABET’s Engineering Accreditation Criteria (EAC).
                  </p>
                </Row>
              </div>
              <div className='sessionRating' style={{ display: rate }}>
                <Row>
                  <Col sm="12" md="6" lg="4" xlg="4">
                    <div className='ratingBox'>
                      <h4>4 out of 5</h4>
                      <p>Top rating</p>
                    </div>
                  </Col>
                  <Col>
                    <div className='ratingBars'>
                      {rating.map((value, index) => {
                        return (
                          <Row>
                            <Col md="6" lg="2">
                              <p>{index + 1} stars</p>
                            </Col>
                            <Col>
                              <div className='ratingBar'><ProgressBar variant='warning' className='ratingBar' now={(value / total) * 100} /></div>
                            </Col>
                          </Row>
                        );
                      })
                      }
                    </div>
                  </Col>
                </Row>
                {comments.map((value, index) => {
                  return (
                    <><Row>
                      <div className='datailsSession'>
                        <div className='datailsSession'>
                          <img src="/Model.jpeg" alt="Model" id='sessionPics' />
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
                      {comments.length - index - 1 == 0 ? <></> : <hr />}
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
              <h2 >$49.99</h2>
              <p>11 hours left</p>
              <Button className="btn btn-primary" id='registerSessionBTN'>
                Register Now
              </Button>
            </Card.Title>
            <hr />
            <Card.Body>
              <h4 id='titleSesDet'><b>This Course Includes</b></h4>
              <div id='greyGuarnt'>
                <div>
                  <p><BsGrid className='BsGrid' />Money Back Guarantee</p>
                </div>
                <div>
                  <p><BsGrid className='BsGrid' />Access on all devices</p>
                </div>
                <div>
                  <p><BsGrid className='BsGrid' />Certification of completion</p>
                </div>
              </div>

            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  </>);
}