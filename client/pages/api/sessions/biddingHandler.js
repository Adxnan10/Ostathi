import db_model from "../../../models/db_model"

/* to use this api use: /api/sessions/biddingHandler */

export default async function biddingHandler(req, res) {
  const { session_id } = { ...req.query }
  if (req.method === 'GET') {

    const bidders = await db_model.getBidders(session_id);

    res.status(200).send({ bidders: bidders })
    return bidders

  } else {
    console.log('No matching');
    res.send("Error");
  }
}