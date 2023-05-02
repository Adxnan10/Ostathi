import { Database } from 'sqlite3'
import { open } from 'sqlite'
// open the database
const getDbConnection = async () => {
  return await open({
    filename: './database.db3',
    driver: Database
  })
}
// query the database to return an array of sessions from the sessions table.
const getAllRequestedSessions = async (searchKeyword, subject, limit, offset) => {
  const db = await getDbConnection();
  let checksubj = ''
  if (subject)
    checksubj = `
   AND EXISTS(
    SELECT * FROM SUBJECT subj JOIN SESSION_SUBJECT ses_subj ON subj.id = ses_subj.subject_id
    WHERE ses_subj.request_session_id = ses.id AND subj.name = '${subject}'
  ) 
  `
  const sessions = await db.all(`
  SELECT * FROM REQUEST_SESSION ses WHERE title LIKE '%${searchKeyword}%' ${checksubj} ORDER BY 'startDate' DESC LIMIT ${limit} OFFSET ${offset}
  `)
  await db.close()
  return sessions
}
const getAllPostedSessions = async (searchKeyword, subject, limit, offset) => {
  const db = await getDbConnection();
  let checksubj = ''
  if (subject)
    checksubj = `
   AND EXISTS(
    SELECT * FROM SUBJECT subj JOIN SESSION_SUBJECT ses_subj ON subj.id = ses_subj.subject_id
    WHERE ses_subj.session_id = ses.id AND subj.name = '${subject}'
  ) 
  `
  const sessions = await db.all(`
  SELECT * FROM SESSION ses WHERE title LIKE '%${searchKeyword}%' ${checksubj} ORDER BY 'startDate' DESC LIMIT ${limit} OFFSET ${offset}
  `)
  await db.close()
  return sessions
}
const getAllUsers = async (searchKeyword, subject, limit, offset) => {
  const db = await getDbConnection();
  let checksubj = ''
  if (subject)
    checksubj = `
   AND pref_subject = '${subject}'
  `
  const users = await db.all(`
    SELECT * FROM USER  WHERE name LIKE '%${searchKeyword}%' ${checksubj} ORDER BY rating DESC LIMIT ${limit} OFFSET ${offset}
  `)
  await db.close()
  return users
}
const getUserImgAndName = async (userId) => {
  const db = await getDbConnection();
  const users = await db.all(`
    SELECT name, profilePicture FROM USER WHERE id = ${userId}
  `)
  await db.close()
  return users
}
const getUser = async (username) => {
  const db = await getDbConnection();
  const user = await db.all(`
    SELECT * FROM USER WHERE username = '${username}'
  `)
  await db.close()
  return user
}
const addUser = async (email, username, passwrod) => {
  const db = await getDbConnection();
  let meta = '';
  try {
    meta = await db.run(`INSERT INTO USER('email', 'name', 'username', 'password', 'rating') 
  values (?,?,?,?,0)`, [email, username, username, passwrod])

  } catch (e) {
    meta = { msg: 'either the email or username is used already.', changes: 0 }
  } finally {
    await db.close()
  }
  return meta
}
const getSessionSubjects = async (session_id, session_type) => {
  const db = await getDbConnection();
  let sql = '';
  if (session_type == 'post') {
    sql = `SELECT name FROM  SUBJECT subj JOIN SESSION_SUBJECT ses_subj WHERE subj.id =  ses_subj.subject_id AND ses_subj.session_id = '${session_id}' GROUP BY name`
  } else if (session_type == 'requested') {
    sql = `SELECT name FROM  SUBJECT subj JOIN SESSION_SUBJECT ses_subj WHERE subj.id =  ses_subj.subject_id AND ses_subj.request_session_id = '${session_id}' GROUP BY name`
  }
  const subjects = await db.all(sql)
  await db.close()
  return subjects
}
// query the database to return one object holding all the details of the session with the id given. Return data from the sessions table.
const getSessionDetails = async (session_id) => {
  const db = await getDbConnection();
  const session = await db.get('SELECT * FROM session WHERE id = ?', [session_id])
  await db.close()
  return session
}
// inserts in the sessions table the session_data given. Note the session_data parameter is an object that holds the session columns like the author and the content.
// returns metadata about the inserted row
const addSession = async (session_data) => {
  // const db = await getDbConnection();
  // const meta = await db.run(`insert into sessions('title', 'description', 'content', 'author', 'likes', 'arabicContent') 
  // values (?,?,?,?,0,?)`, [session_data.title, session_data.description, session_data.content, session_data.author, session_data.arabicContent])
  // await db.close()
  return meta
}
// updates the sessions table with the data given. 
// Note that the data parameter is an object that holds the session columns like the author and the content 
// And returns metadata about the updated row.
const updateSession = async (session_id, data) => {
  // const db = await getDbConnection();
  // const meta = await db.run(`update sessions set title = ?, description = ?, content = ?, author = ?, arabicContent = ?
  // where id = ${session_id}`, [data.title, data.description, data.content, data.author, data.arabicContent])
  // await db.close()
  return meta
}
// deletes the session from the database. And returns metadata about the affected row.
const deletesession = async (session_id) => {
  const db = await getDbConnection();
  const meta = await db.run(`DELETE FROM session WHERE id = ${session_id}`)
  await db.close()
  return meta
}
// find the number of likes for the session, increment it, and save it back to the table.
// const likesession = async (session_id) => {
//   const db = await getDbConnection();
//   const meta = await db.run(`update sessions set likes = likes + 1 where id = ${session_id}`)
//   await db.close()
//   return meta
// }
export default {
  getAllRequestedSessions,
  getAllPostedSessions,
  getAllUsers,
  getUser,
  addUser,
  getUserImgAndName,
  getSessionSubjects,
  getSessionDetails,
  addSession,
  updateSession,
  deletesession,
  // likesession
}