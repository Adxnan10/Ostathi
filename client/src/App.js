import './App.css';
import React, { useEffect, useState } from 'react'
function App() {
  const [userData, setUserData] = useState({});
  useEffect(() => {
    fetch("/home")
      .then(res => res.json())
      .then(data => setUserData(data));
  }, [])
  return (
    <div className="App">
      {
        typeof userData === 'undefined' ? (<p>Loading..</p>) :
          (<p>Hi {userData.username}</p>)
      }
    </div>
  );
}

export default App;
