import { useSession } from "next-auth/react"
import Form from 'react-bootstrap/Form'
import { useState } from 'react'
import { useRouter} from 'next/router'
import useSWR from 'swr'
import Error from "./error"


const fetcher = (...args) => fetch(...args).then((res) => res.json())
//const fetcher = (...args) => fetch(...args);

export default function RequestSession() {
    const { data: session, status } = useSession() 
    const [subject1, setSubject1] = useState('')
    const [title1, setTitle1] = useState('')
    const [date1, setDate1] = useState('')
    const [Duration1, setDuration1] = useState('')
    const [description1, setDesc1] = useState('')
    const [startBid1, setBid1] = useState('')
    const [subject, setSubject] = useState('')
    const [title, setTitle] = useState('')
    const [date, setDate] = useState('')
    const [Duration, setDuration] = useState('')
    const [description, setDesc] = useState('')
    const [startBid, setBid] = useState('')
    const [type, setType] = useState('')
    const [ID, setID] = useState('')
    const { data, error, isLoading } = useSWR(`/api/sessions/requestSession?subject=${subject}&title=${title}&Date=${date}&Duration=${Duration}&description=${description}&startBid=${startBid}&type=${type}&id=${ID}`, fetcher)
    const router = useRouter()


    if(status === "authenticated") {
        const id = session.user.id;

    if(data){
        router.push("/")
    }

    const send = (event) => {
        event.preventDefault()
        setID(id)
        setType("POST")
        setBid(startBid1)
        setDate(date1)
        setDesc(description1)
        setTitle(title1)
        setDuration(Duration1)
        setSubject(subject1)
        // fetch(`/api/sessions/requestSession`,{
        //     method: "POST",
        //     headers: {'Accept': 'application/json',"Content-Type" : "application/json"},
        //     body: JSON.stringify({
        //         id:id,
        //         startBid:startBid,
        //         Date:date,
        //         description:description,
        //         subject:subject,
        //         title:title,
        //         Duration:Duration
        //     })
        // }).then((res) => res.json()).then(res => {
        //     console.log(res.status)
        //     console.log("status")
        //     if (res.status == 200){
        //         console.log(res)
        //     }
        // })

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
                        <select className="row full-width" name="subject" placeholder="Software Engineering" onChange={(event) => {setSubject1(event.target.value)}}>
                            <option value="Tech" defaultValue>Technology</option>
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
                                <label className="row" htmlFor="Duration"> Duration</label>
                                <input className="row half-width" type="text" name="Duration" placeholder="Enter in minutes" required onChange={(event) => {setDuration1(event.target.value)}}/>
                            </div>
                        </section>
                        <label className="row" htmlFor="description"> Session Description </label>
                        <textarea className="row full-width" name="description" rows={5} placeholder="Enter a description for the session" required onChange={(event) => {setDesc1(event.target.value)}}/>
                        <label className="row" htmlFor="startBid"> Starting Bids at </label>
                        <input className="row quarter-width" type="number" name="startBid" placeholder="SAR" min={0} step={0.01} required onChange={(event) => {setBid1(event.target.value)}}/>
                        <button className="activeButtonDS btn btn-danger" type="submit" id="requestButton"> Request Session </button>
                    </Form>
                </div>
            </div>

        </>
    ); } else {
      //  return(router.push('/login'));
}
}