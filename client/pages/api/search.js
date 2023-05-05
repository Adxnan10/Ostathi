import db_model from "../../models/db_model"

export default async function handler(req, res) {
  /* to use this api use: search?searchType=sth&subject=sth&sessionType=sth */

  /* req.query may contain: { searchType: '', subject: '', sessionType: '', searchKeyword: '' } */
  let searchResult;
  const { searchType, subject, sessionType, searchKeyword, offset } = { ...req.query }

  if (searchType == 'session') {
    if (sessionType == 'requested') {
      searchResult = await db_model.getAllRequestedSessions(searchKeyword, subject, 10, 0)
    }
    else if (sessionType == 'post') {
      searchResult = await db_model.getAllPostedSessions(searchKeyword, subject, 10, 0)
    } else {
      res.status(400).send("invalid request. make sure url sends the right query.")
    }
  } else if (searchType == 'tutor') {
    searchResult = await db_model.getAllUsers(searchKeyword, subject, 10, 0)
  }
  res.status(200).send({ "result": searchResult, results_no: searchResult.length })
}