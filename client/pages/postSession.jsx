import { useSession } from "next-auth/react"
import Form from 'react-bootstrap/Form'
import { useRouter } from 'next/router'
import { useState } from 'react'
import useSWR from 'swr'
import Error from "./error"

const fetcher = (...args) => fetch(...args).then((res) => res.json())


export default function PostSession() {
    const [subject1, setSubject1] = useState('')
    const [title1, setTitle1] = useState('')
    const [date1, setDate1] = useState('')
    const [Duration1, setDuration1] = useState('')
    const [description1, setDesc1] = useState('')
    const [price1, setPrice1] = useState('')
    const [Subject, setSubject] = useState('')
    const [title, setTitle] = useState('')
    const [date, setDate] = useState('')
    const [Duration, setDuration] = useState('')
    const [description, setDesc] = useState('')
    const [price, setPrice] = useState('')
    const [type, setType] = useState('')
    const [type1, setType1] = useState('')
    const [type2, setType2] = useState('')
    const [ID, setID] = useState('')
    const { data, error, isLoading } = useSWR(`/api/sessions/postSession?subject=${Subject}&title=${title}&Date=${date}&Duration=${Duration}&description=${description}&price=${price}&type2=${type2}&type=${type}&id=${ID}`, fetcher)
    const router = useRouter()
    const { data: session, status } = useSession()
    const { data: subjects, error: subjectError, isLoading: loadingSubjects } = useSWR(`/api/subjects/getSubjects`, fetcher)
    if (status !== "authenticated") {
        return <h1 className="404-block d-flex justify-content-center align-items-center" style={{ height: '60vh' }} onClick={() => router.push('/login')}>You're not signed in. click here to sign in</h1>
    }

    const id = session.user.id;

    if(data){
        router.push("/")
    }

    const send = (event) => {
        event.preventDefault()
        setID(id)
        setType(type1)
        setType2("POST")
        setPrice(price1)
        setDate(date1)
        setDesc(description1)
        setTitle(title1)
        setDuration(Duration1)
        setSubject(subject1)
    }

    return (
        <>
            <div className="pageHeaderBar">
                <h1> Post a new session</h1> <br />
                <h3 style={{ fontWeight: 'lighter' }}> Enter the session’s details below </h3>
            </div>

            <div className="container pageContent">
                <div>
                    <h2> Teaching is the greatest act of optimism. </h2>
                    <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodadipiscing elit, sed do eiusmodLorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
                </div>

                <div className="container">
                    <Form className="form-post" method="POST" onSubmit={send}>
                        <label className="row" htmlFor="Subject"> Session Subject</label>
                        <select className="row full-width" name="Subject" placeholder="Software Engineering"  onChange={(event) => {setSubject1(event.target.value)}}>
                            <option value="Tech" defaultValue>Technology </option>
                            <option value="Math"> Mathematics </option>
                            <option value="Physics"> Physics </option>
                            <option value="Chemistry"> Chemistry </option>
                            
                        </select>
                        <label className="row" htmlFor="title"> Session Title </label>
                        <input className="row full-width" type="text" name="title" placeholder="Introduction to Web Development and Engineering" required onChange={(event) => {setTitle1(event.target.value)}}/>
                        <section className="row d-flex justify-content-between">
                            <div className="col">
                                <label className="row" htmlFor="Date"> Start Date / Time </label>

                                <input className="row half-width" type="datetime-local" name="Date" required onChange={(event) => {setDate1(event.target.value)}}/>

                            </div>
                            <div className="col">
                                <label className="row" htmlFor="Duration"> Duration </label>
                                <input className="row half-width" type="text" name="Duration" placeholder="Enter in minutes" required onChange={(event) => {setDuration1(event.target.value)}}/>
                            </div>
                        </section>
                        <section className="row d-flex justify-content-between">
                            <div className="col">
                                <label className="row" htmlFor="Type"> Type </label>
                                <select className="row half-width" name="Type"  onChange={(event) => {setType1(event.target.value)}}>
                                    <option value="one-to-one"> One-to-one session </option>
                                    <option value="group"> Group session </option>
                                    <option value="workshop" selected> Workshop </option>
                                </select>
                            </div>
                            <div className="col">
                                <label className="row" htmlFor="Price"> Price </label>
                                <input className="row half-width" type="number" name="Price" placeholder="SAR" min={0} step={0.01} required onChange={(event) => {setPrice1(event.target.value)}}/>
                            </div>
                        </section>
                        <label className="row" htmlFor="Description"> Session Description </label>
                        <textarea className="row full-width" name="Description" rows={7} placeholder="Enter a description for your session" required onChange={(event) => {setDesc1(event.target.value)}}/>
                        <button className="activeButtonDS btn btn-danger" type="submit" id="postButton"> Post Session </button>
                    </Form>
                </div>
            </div>
        </>
    )
}