import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'

export default function SessionCardP({ ...props }) {
  return (
    <Card className="session-card session-card-posted" style={{ width: '18rem', borderRadius: '1rem' }}>
      <Card.Img className="session-card-img" variant="top" src="Model.jpeg" />
      <Card.Body>
        <div className="flex">
          icon1, icon2 {" Here should be the icons"}
        </div>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <div className="flex">
          Here should be the author and price
        </div>
      </Card.Body>
    </Card>
  )
}