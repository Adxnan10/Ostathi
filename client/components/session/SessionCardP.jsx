import { BsClockHistory, BsGrid } from 'react-icons/bs'
import Card from 'react-bootstrap/Card'
import Router from 'next/router'
import { FaEdit } from 'react-icons/fa'
import { MdDeleteForever } from 'react-icons/md'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
export default function SessionCardP({ ...props }) {
  /**
   * you should pass a session as an object
   * a session object looks like:
    post: true, // this is not necessary for this component to work
    topic: "Math",
    duration: "2 hours",
    title: "Linear Algebra",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic, voluptate!",
    img: "/Model.jpeg",
    userName: "Yzd",
    userImg: "/logo.svg",
    price: 20
   */
  const class_images = {"math" : "/math.png" , "programming" : "/programming.png", "algorithms" : "/programming.png",
     "physics" : "/physics.png" , "data structures" : "/programming.png"  , "medicine" : "/medicine.png" }
  const data = props.data
  const description = " " + props.session.description
  const subjects = data.subjects.map((value) => value.name).join(", ").substring(0, 15) + "..."
  const subject = data.subjects.map((value) => value.name)[0]
  const deleteSession = () => {
    const answer = confirm('Are you sure you want to delete this session?')
    if (answer)
      fetch(`/api/sessions/deleteSession?session_id=${props.session.id}&session_type=post`, {
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
      <div className="indicator">posted</div>
      <div className={`indicator session-type`}>{props.session.type}</div>
      <Card.Img onClick={redierctToSession} className="session-card-img" variant="top" src={subject in class_images ? class_images[subject] : "/default_class.png"} alt={subject in class_images ? subject + " icon" : "default session icon"}/>
      <Card.Body>
        <Container onClick={redierctToSession}>
          <div className="session-info d-flex justify-content-around" style={{ color: "#666976" }}>
            <div className="topic">
              <BsGrid />
              <span> {subjects}</span>
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
          <Button variant='none' className="indicator-edit-btn" onClick={() => Router.push(`/session/edit/${props.session.id}`)}>Edit <FaEdit /></Button>
          <Button variant='none' className="indicator-delete-btn" onClick={() => deleteSession()}>Delete <MdDeleteForever /></Button>
        </> : <div className="d-flex justify-content-between align-items-center">
          <div className='user-info' onClick={redierctToSession}>
            <img src={data.user[0].profilePicture == undefined ? "Profile.png" : data.user[0].profilePicture} alt="user pic" className='user-pic rounded-pic' />
            <span>{data.user[0].name}</span>
          </div>
          <div className='session-price' style={{ color: "#F5931C" }} >
            <span>{props.session.price} SAR</span>
          </div>
        </div>
        }

      </Card.Body>
    </Card>
  )
}