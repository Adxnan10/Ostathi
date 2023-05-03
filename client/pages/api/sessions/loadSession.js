import db_model from "../../../models/db_model"

export default async function handler(req, res) {
    /* to use this api use: /api/sessions/loadSession */

    /* req.query may contain: { session_id: '', session_type: '' } */
    // Call this api with the predefined query { session_id: '', session_type: ''}
    // and it will return the session info
    const { session_id, session_type } = { ...req.query }
    const session = await db_model.getSessionDetails(session_id, session_type)      // get the session info
    const attendees = await db_model.getSessionAttendees(session_id)                // get the session attendees info
    res.status(200).send({ session: session, attendees: attendees })
}
