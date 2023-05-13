import db_model from "../../../models/db_model"

export default async function sessionHandler(req, res) {
  if (req.method === 'POST') {
    const id = req.body.id;
    const user_id = req.body.user_id;
    const createdSessions = await db_model.registerSession(id, user_id)

    res.redirect(`/session?session_id=${id}&session_type=post&user_id=${user_id}`);   // redirect to the registered session's page

  } else {
    res.send("Error");
  }
}