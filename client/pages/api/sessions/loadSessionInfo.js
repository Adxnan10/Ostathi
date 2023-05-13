import db_model from "../../../models/db_model"

export default async function handler(req, res) {
  /* to use this api use: /api/sessions/loadSessionInfo */

  /* req.query may contain: { session_id: '', session_type: '', user_id: '' } */
  // Call this api with the predefined query { session_id: '', session_type: '', user_id: '' }
  // and it will return the categories and user of that session
  const { session_id, session_type, user_id } = { ...req.query }
  if (!session_id || !session_type || !user_id) {
    res.status(400).send("request query is incorrect")
  }
  const user = await db_model.getUserImgAndName(user_id)
  const subjects = await db_model.getSessionSubjects(session_id, session_type)
  res.status(200).send({ user: user, subjects: subjects })
}