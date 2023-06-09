import { BsClockHistory, BsGrid } from 'react-icons/bs'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Router from 'next/router'
import { FaEdit } from 'react-icons/fa'
import { MdDeleteForever } from 'react-icons/md'
import { AiOutlineCalendar } from 'react-icons/ai'
import Container from 'react-bootstrap/Container'

export default function SessionCardR({ ...props }) {
  /**
   * you should pass a session as an object
   * a session object looks like:
    post: false, // this is not necessary for this component to work
    topic: "Math",
    duration: "2 hours",
    title: "Linear Algebra",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic, voluptate!",
    img: "/Model.jpeg",
    userName: "Yzd", 
    userImg: "/logo.svg",
    price: 20
   */
  const class_images = {
    "math": "/math.png", "programming": "/programming.png", "algorithms": "/programming.png",
    "physics": "/physics.png", "data structures": "/programming.png", "medicine": "/medicine.png"
  }
  const data = props.data
  const description = " " + props.session.description
  const subjects = data.subjects.map((value) => value.name).join(", ").substring(0, 15) + "..."
  const subject = data.subjects.map((value) => value.name)[0]
  const deleteSession = () => {
    const answer = confirm('Are you sure you want to delete this session?')
    if (answer)
      fetch(`/api/sessions/deleteSession?session_id=${props.session.id}&session_type=requested`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(res => res = res.json()).then(res => {
        if (res.message == "Done") {
          alert('Session deleted successfully!')
          Router.reload()
        }
        else
          alert('Something went wrong, please try again later.')
      })
  }
  const redierctToSession = () => {
    Router.push(`/session?session_id=${props.session.id}&session_type=requested&user_id=${data.user[0].id}`)
  }
  return (
    <Card className="session-card session-card-posted" style={{ width: '20rem', borderRadius: '1rem' }}>
      <div className="indicator">requested</div>
      <div className={`indicator session-type`}>one-one</div>
      <Card.Img onClick={redierctToSession} className="session-card-img" variant="top" src={subject in class_images ? class_images[subject] : "/default_class.png"} alt={subject in class_images ? subject + " icon" : "default session icon"} />
      <Card.Body>

        <Container className='clickable-container' onClick={redierctToSession}>
          <div className="session-info d-flex justify-content-between" style={{ color: "#666976", fontSize: '.9em', fontStyle: 'italic' }}>
            <div className="date" style={{ color: "#666976" }}>
              <AiOutlineCalendar /><span>{` ${props.session.Date} at ${props.session.Time}`}</span>
            </div>
            <div className="duration" >
              <BsClockHistory /><span>{` ${props.session.duration} mins`}</span>
            </div>
          </div>
          <Card.Title>{props.session.title}</Card.Title>
          <Card.Text style={{ color: "#666976" }}>
            {description.substring(0, 100)} <span style={{ color: '#6E7BAF' }}>...Read more</span>
          </Card.Text>
        </Container>
        {props.owner ? <>
          <Button variant='none' className="indicator-edit-btn" onClick={() => Router.push(`/session/edit/requestSession?id=${data.user[0].id}&subject=${props.session.subject}&title=${props.session.title}&date=${props.session.Date}&duration=${props.session.duration}&description=${props.session.description}&startBid=${props.session.startBid}&time=${props.session.Time}&session_id=${props.session.id}`)}>Edit <FaEdit /></Button>
          <Button variant='none' className="indicator-delete-btn" onClick={() => deleteSession()}>Delete <MdDeleteForever /></Button>
        </> : <div className="d-flex justify-content-between align-items-center">
          <div className='user-info'>
            <img src={data.user[0].profilePicture == undefined ? "Profile.png" : data.user[0].profilePicture} alt="student pic" className='user-pic rounded-pic' />
            <span>{data.user[0].name}</span>
          </div>
          <div className='session-bid' style={{ color: "#F5931C" }} >
            <Button onClick={redierctToSession}>Bid Now</Button>
            <span>Bids starts at: {props.session.startBid} SAR</span>
          </div>
        </div>
        }
      </Card.Body>
    </Card>
  )
}