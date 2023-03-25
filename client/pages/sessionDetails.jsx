import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


export default function SessionDetails(){
    return(<>
    <div className="sessionBackGrnd"/>

    <Container>
       <Row>
        <Col lg="8">
            <Row>
               <Col lg="8" xl="6" className='buttonSession'>
               <Button className="btn btn-primary optionSessionPage" id='overviewSession'>
                        Overview
                    </Button>
                    <Button className="btn btn-primary optionSessionPage" id='ratingSession'>
                        Rating
                    </Button>
               </Col>
                   
            </Row>
            <Row>
                <div id='sessionDescription'>
                    <Row>
                        <div className='datailsSession'>
                                <div className='datailsSession'>
                                    <img src="/Model.jpeg" alt="Model" id='sessionPics'/>
                                    <p id='nameSessionDet'>Yazeed</p >
                                </div>
                                <div className='datailsSession'>
                                    <p>ICON HERE</p>
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
            </Row>
        </Col>
        <Col>
            <Card id='floatingCard'>
                <Card.Img variant="top" src="/Model.jpeg" id='tutorPicSD'/>
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
                        <p>Money Back Guarantee</p>
                    </div>
                    <div>
                    <p>Access on all devices</p>
                    </div>
                    <div>
                        <p>Certification of completion</p>
                    </div>
                    </div>
                    
                </Card.Body>
            </Card>
        </Col>
       </Row>
    </Container>
    </>);
}