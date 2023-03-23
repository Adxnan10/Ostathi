const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())

app.get("/home", (req, res) => {
  res.json({ username: "Adnan", email: "blablaxxx@gmail.com" })
});

app.listen(3001, () => console.log("server's port 5000, cors enabled :)"));
