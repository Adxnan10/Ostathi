import db_ratingModel from "../../../models/db_ratingModel"
export default async function handler(req, res) {
  /* This api should be used by next auth only */
  if (req.method === 'POST') {
    const { rater_id, tutor_id, rating, comment } = req.body
    const date = new Date()
    const formattedDate = date.getUTCFullYear() + "-" + date.getUTCMonth() + "-" + date.getUTCDay()
    const meta = await db_ratingModel.addRating(rater_id, tutor_id, rating, comment, formattedDate)
    if (meta.changes == 1) // meta.changes = 1 is success
      res.status(200).send({ ...meta, msg: "The rating was recorded successfully." })
    else
      res.status(500).send(meta)
  } else {
    res.status(500).send("Url should not be accessed this way")
  }

}