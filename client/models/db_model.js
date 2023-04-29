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
const getAllSessions = async () => {
  const db = await getDbConnection();
  const sessions = await db.all('SELECT * FROM SESSION')
  await db.close()
  return sessions
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
  getAllSessions,
  getSessionDetails,
  addSession,
  updateSession,
  deletesession,
  // likesession
}