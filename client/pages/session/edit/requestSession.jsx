import { useSession } from "next-auth/react"
import Form from 'react-bootstrap/Form'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Alert from 'react-bootstrap/Alert'
import useSWR from 'swr'
import Error from "../../error"


const fetcher = (...args) => fetch(...args).then((res) => res.json()) // To be called by useSWR

export default function RequestSession() {
    const router = useRouter()
    const { data: session, status } = useSession()
    const { data: subjects, error: subjectError, isLoading: loadingSubjects } = useSWR(`/api/subjects/getSubjects`, fetcher)
    const { id, subject:oldsubject, title:oldtitle, date:olddate, duration:oldduration, description:olddescription, startBid:oldstartBid, time:oldTime, session_id } = router.query
    const oldDateTime = olddate + "T" + oldTime
    const [alertBlcok, setAlert] = useState('none')
    const [alertBlcok2, setAlert2] = useState('none')
    const [subject, setSubject] = useState(oldsubject)
    const [title, setTitle] = useState(oldtitle)
    const [date, setDate] = useState(oldDateTime)
    const [Duration, setDuration] = useState(oldduration)
    const [description, setDesc] = useState(olddescription)
    const [startBid, setStartBid] = useState(oldstartBid)    
    



    if (status === "authenticated") {
        const id = session.user.id;


        const send = (event) => {
            event.preventDefault()
            fetch(`/api/sessions/editSession`, {
                method: "POST",
                headers: { 'Accept': 'application/json', "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: id,
                    startBid: startBid,
                    Date: date,
                    description: description,
                    subject: subject,
                    title: title,
                    Duration: Duration,
                    sessionID:session_id,
                    session_type:"requested"
                })
            }).then((res) => res.json()).then(res => {
                if (res.status == "success") {
                    setAlert("block")
                    setTimeout(() => { router.push(`/session?session_id=${session_id}&session_type=requested&user_id=${session.user.id}`) }, 2000);
                } else if (res.status == "fail"){
                    setAlert2("block")
                } else {
                    return (<Error />)
                }
            })

        }
        return (
            <>
                <div className="pageHeaderBar">
                    <h1> Request a new session </h1> <br />
                    <h3 style={{ fontWeight: 'lighter' }}> Enter the session’s requirements below </h3>
                </div>

                <div className="container pageContent">
                    <div>
                        <h2> Being a student is easy. Learning requires actual work. </h2>
                        <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodadipiscing elit, sed do eiusmodLorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
                    </div>

                    <div className="container">
                        <Form className="form-post" method="POST" onSubmit={send}>
                            <label className="row" htmlFor="subject"> Session Subject</label>
                            <select className="row full-width" name="subject" placeholder="Choose Subject" onChange={(event) => { setSubject(event.target.value) }}>
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
                            <input className="row full-width" type="text" name="title" value={title} placeholder="Introduction to Web Development and Engineering" required onChange={(event) => { setTitle(event.target.value) }} />
                            <section className="row d-flex justify-content-between">
                                <div className="col">
                                    <label className="row" htmlFor="Date"> Start Date / Time </label>
                                    <input className="row half-width" type="datetime-local" name="Date" value={date} required onChange={(event) => { setDate(event.target.value) }} />
                                </div>
                                <div className="col">
                                    <label className="row" htmlFor="Duration"> Duration</label>
                                    <input className="row half-width" type="text" name="Duration" placeholder="Enter in minutes" value={Duration} required onChange={(event) => { setDuration(event.target.value) }} />
                                </div>
                            </section>
                            <label className="row" htmlFor="description"> Session Description </label>
                            <textarea className="row full-width" name="description" rows={5} placeholder="Enter a description for the session" value={description} required onChange={(event) => { setDesc(event.target.value) }} />
                            <label className="row" htmlFor="startBid"> Starting Bids at </label>
                            <input className="row quarter-width" type="number" name="startBid" placeholder="SAR" min={0} step={0.01} value={startBid} required onChange={(event) => { setStartBid(event.target.value) }} />
                            <button className="activeButtonDS btn btn-danger" type="submit" id="requestButton"> Save </button>
                        </Form>
                    </div>
                </div>
                <div style={{ padding: "50px 150px 0", display: alertBlcok }}>
                    <Alert variant="success"> Added Successfully!</Alert>
                </div>
                <div style={{padding:"50px 150px 0", display:alertBlcok2}}>
            <Alert variant="danger"> Problem Saving Changes. Offer Already Chosen.</Alert>
            </div>
            </>
        );
    } else {
        router.push('/login');

    }
}