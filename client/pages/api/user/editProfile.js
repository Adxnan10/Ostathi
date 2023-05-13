import db_model from "../../../models/db_model"


export default async function accountHandler(req, res) {
    if(req.method === "POST"){
        const body = req.body
        const updateSession = await db_model.updateProfile(body)
        if (updateSession.changes == 1) {
            res.status(201).send({status: "success"});
          } else {
            res.status(500).send({status: "fail"});
          }
        } else {
            const getUserInfo = await db_model.getUser(req.query.username)
            res.send(getUserInfo);
        } 
}