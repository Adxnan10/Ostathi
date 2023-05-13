import { useSession } from "next-auth/react"
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import { useRouter } from 'next/router'
import { useState } from 'react'

import useSWR from 'swr'
import Error from "./error"

const fetcher = (...args) => fetch(...args).then((res) => res.json()) // To be called by useSWR

export default function PostSession() {
    const [alertBlcok, setAlert] = useState('none')
    const [subject, setSubject] = useState('')
    const [title, setTitle] = useState('')
    const [date, setDate] = useState('')
    const [Duration, setDuration] = useState('')
    const [description, setDesc] = useState('')
    const [price, setPrice] = useState('')
    const [type, setType] = useState('')
    const router = useRouter()
    const { data: session, status } = useSession()
    const { data: subjects, error: subjectError, isLoading: loadingSubjects } = useSWR(`/api/subjects/getSubjects`, fetcher)
    if (status === "authenticated") {
        
    const id = session.user.id;
    const send = (event) => {
        event.preventDefault()
        fetch(`/api/sessions/postSession`, {
            method: "POST",
            headers: {'Accept': 'application/json',"Content-Type" : "application/json"},
            body: JSON.stringify({
                id:id,
                price:price,
                Date:date,
                type:type,
                description:description,
                subject:subject,
                title:title,
                Duration:Duration
            }) 
        }).then((res) => res.json()).then(res => {
            if (res.status == "success"){
                setAlert("block")
                setTimeout(() => {router.push("/") }, 3000);
               
            } else {
                return(<Error/>)
            }
        })
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
                        <select className="row full-width" name="Subject" placeholder="Choose Subjcet"  onChange={(event) => {setSubject(event.target.value)}}>
                        <option key={0} value={0}>Choose Subject</option>
                        {subjects &&
                subjects.subjects.map((subject) => {
                  return (
                    <option value={subject.id}>{subject.name}</option>
                  )
                })
              }
                        </select>
                        <label className="row" htmlFor="title"> Session Title </label>
                        <input className="row full-width" type="text" name="title" placeholder="Introduction to Web Development and Engineering" required onChange={(event) => {setTitle(event.target.value)}}/>
                        <section className="row d-flex justify-content-between">
                            <div className="col">
                                <label className="row" htmlFor="Date"> Start Date / Time </label>

                                <input className="row half-width" type="datetime-local" name="Date" required onChange={(event) => {setDate(event.target.value)}}/>

                            </div>
                            <div className="col">
                                <label className="row" htmlFor="Duration"> Duration </label>
                                <input className="row half-width" type="text" name="Duration" placeholder="Enter in minutes" required onChange={(event) => {setDuration(event.target.value)}}/>
                            </div>
                        </section>
                        <section className="row d-flex justify-content-between">
                            <div className="col">
                                <label className="row" htmlFor="Type"> Type </label>
                                <select className="row half-width" name="Type"  onChange={(event) => {setType(event.target.value)}}>
                                    <option value="one-to-one"> One-to-one session </option>
                                    <option value="group"> Group session </option>
                                    <option value="workshop" selected> Workshop </option>
                                </select>
                            </div>
                            <div className="col">
                                <label className="row" htmlFor="Price"> Price </label>
                                <input className="row half-width" type="number" name="Price" placeholder="SAR" min={0} step={0.01} required onChange={(event) => {setPrice(event.target.value)}}/>
                            </div>
                        </section>
                        <label className="row" htmlFor="Description"> Session Description </label>
                        <textarea className="row full-width" name="Description" rows={7} placeholder="Enter a description for your session" required onChange={(event) => {setDesc(event.target.value)}}/>
                        <button className="activeButtonDS btn btn-danger" type="submit" id="postButton"> Post Session </button>
                    </Form>
                </div>
            </div>
            <div style={{padding:"50px 150px 0", display:alertBlcok}}>
            <Alert variant="success"> Added Successfully!</Alert>
            </div>
        </>
    )}
else {
        router.push('/login');
    }
}