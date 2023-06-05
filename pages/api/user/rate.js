import db_ratingModel from "../../../models/db_ratingModel"
export default async function handler(req, res) {
  /* This api should be used by next auth only */
  if (req.method === 'PUT') {
    const { rater_id, tutor_id, rating, comment } = req.body
    const date = new Date()
    const toCut = date.toString().indexOf(':')
    const formattedDate = date.toString().substring(0, toCut - 2)
    const meta = await db_ratingModel.addRating(rater_id, tutor_id, rating, comment, formattedDate)
    if (meta.changes == 1) {  // meta.changes = 1 is success  
      const getUserRatingsCount = await db_ratingModel.getRatingsCount(tutor_id)
      const newRating = getUserRatingsCount.sum / getUserRatingsCount.count
      const editUserRating = await db_ratingModel.updateUserRating(tutor_id, newRating)
      res.status(200).send(meta)
    }
    else
      res.status(500).send(meta)
  } else {
    res.status(500).send("Url should not be accessed this way")
  }

}