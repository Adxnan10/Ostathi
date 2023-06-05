import db_model from "../../../models/db_model"
import bcrypt from 'bcrypt'
export default async function handler(req, res) {
  /* This api should be used by next auth only */
  if (req.method === 'POST') {
    const { email, username, password } = req.body
    const encryptedPass = await bcrypt.hash(password, 10)
    const meta = await db_model.addUser(email, username, encryptedPass)
    if (meta.changes == 1) // meta.changes = 1 is success
      res.status(200).send({ ...meta, msg: "The user was created successfully" })
    else
      res.status(500).send(meta)
  } else {
    res.status(400).send("You should not access this url")
  }
}