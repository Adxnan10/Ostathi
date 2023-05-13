import db_model from "../../../models/db_model"
import bcrypt from 'bcrypt'
export default async function handler(req, res) {
  /* This api should be used by next auth only */
  if (req.method === 'POST') {
    const user = await db_model.getUser(req.body.username)
    if (user.length == 0) {
      res.status(500).send({})
      return;
    }
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if (validPass) {
      delete user['password']
      res.status(200).send({ ...user })
    } else {
      res.status(500).send({})
    }
  } else {
    res.status(500).send({})
  }

}