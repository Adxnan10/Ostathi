import db_model from "../../../models/db_model"

export default async function sessionHandler(req, res) {
  if (req.method === 'POST') {
    const id = req.body.id;
    const user_id = req.body.user_id;
    const createdSessions = await db_model.registerSession(id, user_id)
    res.status(200).send({createdSessions});
  } else {
    res.send("Error");
  }
}