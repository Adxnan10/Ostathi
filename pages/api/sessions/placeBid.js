import db_model from "../../../models/db_model"

 /* to use this api use: /api/sessions/placeBid */

export default async function placeBid(req, res) {
  const { session_id, price, user_id } = { ...req.query }
  if (req.method === 'PUT') {
    
    await db_model.placeBid(session_id, price, user_id);
    
    
    res.status(200).send({ message: "Bid Placed" })


  } else {
    console.log('No matching');
    res.send("Error");
  }
}
