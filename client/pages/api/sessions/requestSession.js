import db_model from "../../../models/db_model"

export default async function sessionHandler(req, res) {
  if (req.method === 'POST') {
    const body = req.body;
    const createdSessions = await db_model.addSession(body, req.id, false);
    res.status(200).send({});
  } else {
    console.log('No matching');
    res.send("Error");
  }
}