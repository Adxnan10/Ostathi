import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import UserCard from '../components/user/UserCard'
import { useState, useRef, useEffect } from 'react'
import { BsSearch } from 'react-icons/bs'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import SessionCardFactory from '../components/session/SessionCardFactory'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import Error from './error'


const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function searchPage() {
  try {
  // const router = useRouter()
  // const { , , , searchKeyword, offset } = { ...router.query }

  const [searchType, setSearchType] = useState('session')
  /* the following vars for front end */
  const subject = useRef('')
  const sessionType = useRef('1')
  const searchKeywords = useRef(" ")
  /* the following vars for backend fetching */
  const [searchKeyword, setSearchKeyword] = useState('')
  const [searchSubject, setSearchSubject] = useState('')
  const [searchSessionType, setSearchSessionType] = useState('post')
  const [content, setContent] = useState('Content is loading')
  const { data, error, isLoading } = useSWR(`/api/search?searchType=${searchType}&subject=${searchSubject}&sessionType=${searchSessionType}&searchKeyword=${searchKeyword}`, fetcher)
  useEffect(() => {
    search()
  }, [searchType])
  useEffect(() => {
    if (error) {
      setContent(<h1 style={{ textAlign: 'center', height: '40vh', color: "#023047" }}>Sorry ostathi, we could not match your search</h1>)
    } else if (isLoading) {
      setContent(<h1 style={{ textAlign: 'center', height: '40vh', color: "#023047" }}>Loading content...</h1>)
    } else {
      if (data.result.length < 1) {
        setContent(<h1 style={{ textAlign: 'center', height: '40vh', color: "#023047" }}>Sorry ostathi, we could not match your search</h1>)
      } else {
        if (searchType == 'session') {
          setContent(data.result.map((value, index) => {
            return <Col key={value.id} xxl={3} xl={4} lg={6} sm={12} ><SessionCardFactory session={value} post={searchSessionType} /></Col>
          }))
        } else {
          setContent(data.result.map((value, index) => {
            return <Col xxl={3} xl={4} lg={6} md={6} sm={12} key={index}><UserCard user={value} /></Col>
          }))
        }
      }
    }
  }, [data])

  const search = (e) => {
    if (e)
      e.preventDefault();
    setSearchSubject(subject.current.value)
    setSearchKeyword(searchKeywords.current.value)
    if (searchType == 'session') {
      setSearchSessionType(sessionType.current.value == '1' ? "post" : "requested")
    } else {

    }
  };

  const changeSearchType = (e) => {
    setSearchType(e.currentTarget.value)
  };
  
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
            {content}
          </Row>
        </Container>
      </div>
    </>
  );} catch {
    <Error/>
  }
}