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
  return (
    <div style={{padding: "20px", width: "100%", height: 800, display: 'flex',flexDirection:'column', alignItems : 'center', rowGap: '50px'}}>
        <div className='session-details-container'>
            <h1> Session Details </h1>
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

        <div className='chat-container'>
            <h1> Chat </h1>
        
        </div>

    </div>
  )
  
}

