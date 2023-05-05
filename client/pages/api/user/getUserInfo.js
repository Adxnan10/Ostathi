import db_model from "../../../models/db_model"

export default async function handler(req, res) {
  // TODO validation
  const {user_id } = { ...req.query }
  const user = await db_model.getUserImgAndName(user_id)
  res.status(200).send({user})
}