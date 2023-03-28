import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import SessionCardP from '../components/session/SessionCardP'
import SessionCardR from '../components/session/SessionCardR'
import UserCard from '../components/user/UserCard'
import { useState, useRef, useEffect } from 'react'
import { BsSearch } from 'react-icons/bs'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { dummySessions, dummyUsers } from '../public/fakeDataBase.json'

export default function searchPage() {
  const [sessions, setSessions] = useState([...dummySessions]);
  const [users, setUsers] = useState([...dummyUsers]);
  const [matchedSessions, setMatchedSessions] = useState([...sessions]);
  const [matchedUsers, setMatchedUsers] = useState([...users]);
  const [searchType, setSearchType] = useState('session')
  const subject = useRef(' ')
  const sessionType = useRef('1')
  const searchKeywords = useRef(" ")
  useEffect(() => {
    search()
  }, [searchType])
  const isMatched = () => {
    return matchedSessions.length > 0 || matchedUsers.length > 0
  }
  const search = (e) => {
    if (e)
      e.preventDefault();
    if (searchType == 'session') {
      setMatchedUsers([])
      setMatchedSessions(sessions.filter((session) => {
        return (
          (session.post == sessionType.current.value)
          && session.title.includes(searchKeywords.current.value)
          && session.topic.includes(subject.current.value)
        )
      }))
    } else {
      setMatchedSessions([])
      setMatchedUsers(users.filter((user) => (
        user.fullName.includes(searchKeywords.current.value)
        && user.major.includes(subject.current.value)
      )))
    }
  };

  const changeSearchType = (e) => {
    setSearchType(e.currentTarget.value)
  };
  // TODO : This is just a dummy search to test the search functionality
  // TODO complete the search page.
  return (
    <>
      <Form onSubmit={search} className="search-box">
        <Form.Group className="mb-3 search-input-group" controlId="formSeachInput">
          <InputGroup>
            <Form.Control
              className="search-bar"
              type="text"
              ref={searchKeywords}
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
          <Form.Select onChange={changeSearchType} aria-label="filter-search-type">
            <option value="session">session</option>
            <option value="tutor">tutor</option>
          </Form.Select>
          <Form.Select onChange={search} ref={subject} aria-label="filter-subject">
            <option value=''>subject</option>
            <option value="Math">Math</option>
            <option value="Physics">Physics</option>
            <option value="Programming">Programming</option>
          </Form.Select>
          {searchType == 'session' ?
            <Form.Select onChange={search} ref={sessionType} aria-label="filter-session-type">
              {/* 1 and 0 to compare with boolean value */}
              <option value="1">learn</option>
              <option value="0">teach</option>
            </Form.Select> : ''
          }

        </Form.Group>
      </Form>
      <div style={{ marginBottom: "4rem" }}>
        <Container>
          <Row>
            {matchedSessions.map((value, index) => {
              return <Col key={index} xxl={3} xl={4} lg={6} sm={12} > {value.post ? <SessionCardP session={value} /> : <SessionCardR session={value} />}</Col>
            })}
          </Row>
        </Container>
        <Container>
          <Row>
            {matchedUsers.map((value, index) => {
              return <Col xxl={3} xl={4} lg={6} md={6} sm={12} key={index}><UserCard user={value} /></Col>
            })}
          </Row>
        </Container>
      </div>

      {isMatched() ? '' : <h1 style={{ textAlign: 'center', height: '40vh', color: "#023047" }}>"Sorry ostathi, we could not match your search"</h1>}
    </>
  )
}