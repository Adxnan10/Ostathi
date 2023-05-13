import React from 'react'
import { IoMdCalendar } from 'react-icons/io';
import { BsClockFill } from 'react-icons/bs';
import { MdGroups } from 'react-icons/md';
import { Router, useRouter } from 'next/router'
import useSWR from 'swr'
import { useSession } from "next-auth/react"



const fetcher = (...args) => fetch(...args).then((res) => res.json()) // To be called by useSWR

export default function SessionRoom() {

    // Get the session's details from the server
    const router = useRouter()
    const { session_id, session_type } = router.query
    
    const { data: session, error, isLoading } = useSWR(`/api/sessions/loadSession?session_id=${session_id}&session_type=${session_type}`, fetcher) // Fetches data from the API
    const { data: user, status } = useSession()

    // If the session is not found, redirect to the error page
    if (error) {
       Router.push(`/error?error=${error}`)
    }

    // Put the session's details in the page
    try {
  return (
    <div style={{marginBottom:"4rem", marginTop:"1rem", padding: "20px", width: "100%", display: 'flex', flexDirection:'column', alignItems : 'center'}}>
        <div className='session-details-container'>
            <h1 style={{alignSelf:"center"}}> Session Details </h1>
            <div class="session-detail">
                <IoMdCalendar /> {session.session.Date}
            </div>
            <div class="session-detail">
                <  BsClockFill /> {session.session.Time}
            </div>
            <div class="session-detail">
                <MdGroups /> {session.attendees.length}
            </div>
        </div>

        <div className='chat-container' style={{marginTop: "2rem", width:"80%", justifyItems:"center", alignItems:"center"}}>
            <h1 style={{textAlign:"center", marginBottom:"1rem"}}> Session Meeting </h1> 
            
                <img src="https://t3.ftcdn.net/jpg/03/78/19/34/360_F_378193453_hMzRmqmk3c8ce4jiR9bpPpte2kWncjQA.jpg" alt="zoom" style={{
                    width: "95%",
                    height: "95%",
                    objectFit: "fill",
                }}/>

            <h6 style={
                {
                    fontSize: "1.3rem",
                    fontWeight: "bold",
                    marginBottom: "2rem",
                    textAlign: "center",
                }
            }> Link to meeting: <a href = {session?.link||"https://zoom.us/test"}> Zoom meeting </a> </h6>
        </div>




    </div>
  ) } 
  catch {
    return ( <div className="404-block d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
    <h1 style={{ color: "#023047" }}>Error Has Occured<span style={{ color: "#F48C06" }}> Ostathi!</span>.</h1>
    </div>)
  }
  
}

