import db_edit_model from "../../../models/db_edit_model"

export default async function sessionHandler(req, res) {
  if (req.method === 'POST') {
    const body = req.body;
    const index = body.Date.search("T")
    const date = body.Date.substring(0,index)
    const time = body.Date.substring(index+1)
    const edited = await db_edit_model.editSession(body, date, time)
    if (edited.changes == 1) {
      res.status(201).send({status: "success"});
    } else {
      res.status(500).send({status: "fail"});
    }
  } else {
    res.status(500);
  }
}