import React, { useEffect, useState } from 'react'
import SessionCardP from '../components/session/SessionCardP'

export default function HomePage() {
  const [userData, setUserData] = useState({});
  useEffect(() => {
    fetch("http://localhost:3001/home")
      .then(res => res.json())
      .then(data => setUserData(data));
  }, []);
  return (
    <div className="App">
      {
        typeof userData === 'undefined' ? (<p>Loading..</p>) :
          (<h1>Hi {userData.username}</h1>)
      }
      <SessionCardP />
    </div>
  );
}