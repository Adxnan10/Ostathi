import db_model from "../../../models/db_model"
import bcrypt from 'bcrypt'
export default async function handler(req, res) {
  /* This api should be used by next auth only */
  if (req.method === 'POST') {
    const user = await db_model.getUser(req.body.username)
    if (user.length == 0) {
      console.log("user is not found")
      res.status(404).send(null)
      return;
    }
    const validPass = await bcrypt.compare(req.body.password, user[0].password)
    if (validPass) {
      res.status(200).send({ user: user[0] })
    } else {
      console.log("incorrect password")
      res.status(404).send(null)
    }
  }

  res.status(404).send(null)
}