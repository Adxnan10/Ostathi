import db_model from "../../../models/db_model"

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Process a POST request
  } else {
    const loadedSession = await db_model.getSessionDetails(1)
    res.send(loadedSession)
  }
}