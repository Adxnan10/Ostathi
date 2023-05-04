import { BsClockHistory, BsGrid } from 'react-icons/bs'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Router from 'next/router';
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
  const data = props.data
  const description = " " + props.session.description
  const subjects = data.subjects.map((value) => value.name).join(", ").substring(0, 15) + "..."
  return (
    <Card onClick={() => Router.push(`/session?session_id=${props.session.id}&session_type=requested&user_id=${data.user[0].id}`)} className="session-card session-card-posted" style={{ width: '20rem', borderRadius: '1rem' }}>
      <div className="indicator">requested</div>
      <div className={`indicator session-type`}>one-one</div>
      <Card.Img className="session-card-img" variant="top" src={/* props.session.img */ "/Model.jpeg"} />
      <Card.Body>
        <div className="session-info d-flex justify-content-around" style={{ color: "#666976" }}>
          <div className="topic">
            <BsGrid /> <span> {subjects}</span>
          </div>
          <div className="duration" >
            <BsClockHistory /><span>{` ${props.session.duration}`}</span>
          </div>
        </div>

        <Card.Title>{props.session.title}</Card.Title>
        <Card.Text style={{ color: "#666976" }}>
          {description.substring(0, 100)} <span style={{ color: '#6E7BAF' }}>...Read more</span>
        </Card.Text>
        <div className="d-flex justify-content-between align-items-center">
          <div className='user-info'>
            <img src={data.user[0].profilePicture == undefined ?"Profile.png" : data.user[0].profilePicture} alt="student pic" className='user-pic rounded-pic' />
            <span>{data.user[0].name}</span>
          </div>
          <div className='session-bid' style={{ color: "#F5931C" }} >
            <Button>Bid Now</Button>
            <span>Bids starts at: {props.session.startBid} SAR</span>
          </div>
        </div>
      </Card.Body>
    </Card>
  )
}