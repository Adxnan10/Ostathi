import db_model from "../../../models/db_model"

 /* to use this api use: /api/sessions/chooseBidder */

export default async function deleteSession(req, res) {
  const { session_id, session_type } = { ...req.query }
  if (req.method === 'DELETE') {
    
    await db_model.deleteSession(session_id, session_type);
    
    
    res.status(200).send({ message: "Done" })


  } else {
    console.log('No matching');
    res.send("Error");
  }
}
