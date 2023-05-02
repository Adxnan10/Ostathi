import db_model from "../../../models/db_model"

export default async function handler(req, res) {
  /* This api should be used by next auth only */
  if (req.method === 'POST') {

    const meta = await db_model.addUser(req.body.email, req.body.username, req.body.password)
    if (meta.changes == 1) // meta.changes = 1 is success
      res.status(200).send({ ...meta, msg: "The user was created successfully" })
    else
      res.status(500).send(meta)
  } else {
    const meta = await db_model.addUser("newForsuer", "ss", "suiii")

  }
}