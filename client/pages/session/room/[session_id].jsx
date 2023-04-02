import React from 'react'
import { IoMdCalendar } from 'react-icons/io';
import { BsClockFill } from 'react-icons/bs';
import { MdGroups } from 'react-icons/md';



export default function SessionRoom() {
  return (
    <div style={{padding: "20px", width: "100%", height: 800, display: 'flex',flexDirection:'column', alignItems : 'center', rowGap: '50px'}}>
        <div className='session-details-container'>
            <h1> Session Details </h1>
            <div class="session-detail">
                <IoMdCalendar /> 11/2/2
            </div>
            <div class="session-detail">
                <  BsClockFill /> 8:00
            </div>
            <div class="session-detail">
                <MdGroups />12
            </div>
        </div>

        <div className='chat-container'>
            <h1> Chat </h1>
        
        </div>

    </div>
  )
  
}

