import db_model from "../../../models/db_model"

export default async function sessionHandler(req, res) {
  if (req.query.type === 'POST') {
    const body = req.query;
    const index = body.Date.search("T")
    const date = body.Date.substring(0,index)
    const time = body.Date.substring(index+1)
    const createdSessions = await db_model.addSession(body, false, date, time);
    res.status(200).send({});
  } else {
    res.status(500);
  }
}