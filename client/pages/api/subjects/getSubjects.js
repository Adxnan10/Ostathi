import db_model from "../../../models/db_model"

export default async function handler(req, res) {
  /* to use this api use: api/subjects/getSubjects */

  const subjects = await db_model.getSubjects()
  if (subjects)
    res.status(200).send({ subjects })
  else
    res.status(400).send({})
}