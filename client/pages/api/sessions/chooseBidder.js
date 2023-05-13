import db_model from "../../../models/db_model"

 /* to use this api use: /api/sessions/chooseBidder */

export default async function bettingHandler(req, res) {
  const { session_id, user_id } = { ...req.query }
  if (req.method === 'PUT') {
    
    await db_model.chooseBidder(session_id, user_id);
    
    
    res.status(200).send({ message: "Done" })


  } else {
    console.log('No matching');
    res.send("Error");
  }
}


/* TODO: choose bidder (session id, user id)*/