import React, { useEffect, useState } from 'react'
import Trying from './trying'
function Header({ title }) {
  return <h1>{title ? title : 'Default title'}</h1>;
}

export default function HomePage() {
  const [userData, setUserData] = useState({});
  // useEffect(() => {
  //   fetch("http://localhost:5000/home")
  //     .then(res => res.json())
  //     .then(data => setUserData(data));
  // }, []);
  return (
    <div className="App">
      <Trying />
      {
        typeof userData === 'undefined' ? (<p>Loading..</p>) :
          (<p>Hi {userData.username}</p>)
      }

    </div>
  );
}