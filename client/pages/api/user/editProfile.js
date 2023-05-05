import db_model from "../../../models/db_model"


export default async function accountHandler(req, res) {
    if(req.method === "POST"){
        const body = req.body
        const createdSessions = await db_model.updateProfile(body)
        res.send(createdSessions);
    } else {
        const getUserInfo = await db_model.getUser(req.query.username)
        res.send(getUserInfo);
    } 
    
}