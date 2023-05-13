import db_model from "../../../models/db_model"

export default async function accountHandler(req, res) {
    const user = req.query.username;
    const userDetails = await db_model.getUser(user)
    if (!userDetails) {
        res.status(400).send();
    }
    if (userDetails.password)
        delete userDetails['password']
    if (!userDetails.id) {
        res.status(500).send();
        return;
    }
    const id = userDetails.id;
    const sessionsAttendee = await db_model.getUserSessions(id)
    const sessionsRequested = await db_model.getUserSessionsRequested(id)
    const ownerPosted = await db_model.getOwnerPosted(id)
    const ownerRequested = await db_model.getOwnerRequested(id)
    const userRating = await db_model.getUserRating(id)
    res.send({ "user": userDetails, "sessions": [...sessionsRequested, ...sessionsAttendee], "rating": [...userRating], "hostSessions": [...ownerPosted, ...ownerRequested] });
} 