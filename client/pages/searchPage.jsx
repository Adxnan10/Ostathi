import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import SessionCardP from '../components/session/SessionCardP'
import SessionCardR from '../components/session/SessionCardR'
import UserCard from '../components/user/UserCard'
import { useState, useRef } from 'react'
import { BsSearch } from 'react-icons/bs'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function searchPage() {
  const dummySessions = [{
    topic: "Math",
    duration: "2 hours",
    title: "Linear Algebra",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic, voluptate!",
    img: "/Model.jpeg",
    userName: "Yzd",
    userImg: "/Model.jpeg",
    price: 20
  },
  {
    topic: "Algorithms",
    duration: "1 hour",
    title: "A* explained",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic, voluptate!",
    img: "/Model.jpeg",
    userName: "Adnan",
    userImg: "/Model.jpeg",
    price: 30
  }
  ];
  const dummyUsers = [{
    fullName: "Yzd",
    img: "/Model.jpeg",
    rating: 3,
    major: "Physics"
  }];
  const [matchedSearch, setmatchedSearch] = useState([...dummySessions]);
  // TODO : This is just a dummy search to test the search functionality
  const title = useRef("");
  const search = (e) => {
    e.preventDefault();
    setmatchedSearch(dummySessions.filter((session) => session.title.includes(title.current.value)))
  };
  // TODO complete the search page.
  return (
    <>
      <Form onSubmit={search} className="search-box">
        <Form.Group className="mb-3 search-input-group" controlId="formSeachInput">
          <InputGroup>
            <Form.Control
              className="search-bar"
              type="text"
              ref={title}
              onChange={search}
              placeholder="Search here"
            >
            </Form.Control>
            <Button
              type="submit"
              // onClick={search}
              id="searchButton"
            >
              <BsSearch size="1.5rem" />
              Search
            </Button>
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3 d-flex search-input-group" controlId="formFilters">
          <Form.Select aria-label="filter-subject">
            <option>subject</option>
            <option value="Math">Math</option>
            <option value="Physics">Physics</option>
            <option value="Programming">Programming</option>
          </Form.Select>
          <Form.Select aria-label="filter-search-type">
            <option>looking for..</option>
            <option value="tutor">tutor</option>
            <option value="session">session</option>
          </Form.Select>
          <Form.Select aria-label="filter-session-type">
            <option>session type</option>
            <option value="learn">learn</option>
            <option value="teach">teach</option>
          </Form.Select>
        </Form.Group>
      </Form>
      <Container>
        <Row>
          {matchedSearch.length > 0 ? matchedSearch.map((value, index) => {
            return <Col key={index} ><SessionCardP session={value} /></Col>
          }) : "Nothing matches the search"}
        </Row>
      </Container>
      <Container>
        <Row>
          {dummyUsers.map((value, index) => {
            return <Col key={index}><UserCard user={value} /></Col>
          })}
        </Row>
      </Container>
    </>
  )
}