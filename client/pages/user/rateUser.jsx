import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import ReactStars from "react-rating-stars-component";
import { BsStar, BsStarFill } from 'react-icons/bs'
export default function RateUser({ ...props }) {
  const [show, setShow] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true)
  };
  const ratingHandler = (val) => {
    setRating(val);
  };
  const commentHandler = (val) => { // maybe ref instead? 
    setComment(val.target.value);
  };
  const handleRate = () => {
    const ratingDate = {
      rater_id: props.rater_id,
      tutor_id: props.tutor_id,
      rating: rating,
      comment: comment
    }
    fetch("/api/user/rate", {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ratingDate)
    }).then(res => res.json()).then(res => {
      if (res.changes) {
        alert("Your rate was recorded.")
        handleClose()
      }
    })
  }
  const modalBody = () => {
    if (!props.rater_id)
      return <Alert variant={"warning"} style={{ margin: '20px' }}>
        You should log in first.
      </Alert>
    else if (props.hasRated) {
      return <Alert variant={"warning"} style={{ margin: '20px' }}>
        You have rated this user.
      </Alert>
    }
    else
      return (
        <>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Rating</Form.Label>
                <ReactStars
                  size={30}
                  count={5}
                  edit={true}
                  emptyIcon={<BsStar />}
                  filledIcon={<BsStarFill />}
                  value={rating}
                  activeColor="#fdb022"
                  onChange={ratingHandler}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Your valuable comment</Form.Label>
                <Form.Control as="textarea" rows={3} onChange={commentHandler} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <div>
              <Button variant="primary" onClick={handleRate} id="registerSessionBTN" style={{ width: 'fit-content', padding: "0.375rem 0.75rem", fontWeight: "400" }}>
                Submit rate
              </Button>
            </div>
          </Modal.Footer>
        </>
      )
  }
  return (
    <>
      <Button className="btn btn-primary" id='registerSessionBTN' onClick={handleShow}>
        Rate
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Rate</Modal.Title>
        </Modal.Header>
        {modalBody()}
      </Modal>
    </>
  );
}