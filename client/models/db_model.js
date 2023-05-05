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
    SELECT id, name, profilePicture FROM USER WHERE id = '${userId}'
  `)
  await db.close()
  return users
}

const getUser = async (username) => {
  const db = await getDbConnection();
  const user = await db.get(`
    SELECT * FROM USER WHERE username = '${username}'
  `)
  await db.close()
  return user
}

const getSessionRating = async (session_id) => {
  const db = await getDbConnection();
  const sessions = await db.all(`
  SELECT * FROM RATING s JOIN User ss ON s.rater_id = ss.id WHERE EXISTS(
  SELECT * FROM SESSION WHERE s.tutor_id = tutor_id AND id = '${session_id}'
  )
  `)
  await db.close()
  return sessions
}

const getUserSessions = async (user_id) => {
  const db = await getDbConnection();
  const sessions = await db.all(`
  SELECT * FROM SESSION ses WHERE EXISTS(
  SELECT * FROM SESSION_ATTENDEE WHERE ses.id = session_id AND user_id = '${user_id}'
  )
  `
  )
  await db.close()
  return sessions
}

const registerSession = async (id, user_id) => {
  const db = await getDbConnection();
  let meta = '';
  meta = await db.run(`INSERT INTO Session_Attendee ('user_id', 'session_id') 
  values ('${user_id}','${id}')`)
  await db.close()
  return meta
}

const getUserSessionsRequested = async (user_id) => {
  const db = await getDbConnection();
  const sessions = await db.all(`
  SELECT * FROM REQUEST_SESSION WHERE requester_id = '${user_id}'`
  )
  await db.close()
  return sessions
}

const getOwnerPosted = async (user_id) => {
  const db = await getDbConnection();
  const sessions = await db.all(`
  SELECT * FROM Session WHERE tutor_id = '${user_id}'`
  )
  await db.close()
  return sessions
}

const getOwnerRequested = async (user_id) => {
  const db = await getDbConnection();
  const sessions = await db.all(`
  SELECT * FROM Request_Session WHERE tutor_id = '${user_id}'`
  )
  await db.close()
  return sessions
}

const getUserRating = async (user_id) => {
  const db = await getDbConnection();
  const sessions = await db.all(`
  SELECT * FROM Rating WHERE tutor_id = '${user_id}'`
  )
  await db.close()
  return sessions
}
const updateProfile = async (body) => {
  const db = await getDbConnection();
  let meta = '';
  let email = body.Email;
  if (email == "") {
    meta = await db.run(`
    UPDATE USER
    SET name = '${body.Name}'
    WHERE id = '${body.id}'`)
  } else {
    meta = await db.run(`
    UPDATE USER
    SET name = '${body.Name}', email = '${email}'
    WHERE id = '${body.id}'`)
  }
  await db.close()
  return meta
}

const getSessionSubjects = async (session_id, session_type) => {
  const db = await getDbConnection();
  let sql = '';
  if (session_type == 'post') {
    sql = `SELECT name, id FROM  SUBJECT subj JOIN SESSION_SUBJECT ses_subj WHERE subj.id =  ses_subj.subject_id AND ses_subj.session_id = '${session_id}' GROUP BY name`
  } else if (session_type == 'requested') {
    sql = `SELECT name, id FROM  SUBJECT subj JOIN SESSION_SUBJECT ses_subj WHERE subj.id =  ses_subj.subject_id AND ses_subj.request_session_id = '${session_id}' GROUP BY name`
  }
  const subjects = await db.all(sql)
  await db.close()
  return subjects
}
const getSubjects = async () => {
  const db = await getDbConnection();
  const subjects = await db.all(`SELECT * FROM SUBJECT`)
  await db.close()
  return subjects
}
// query the database to return one object holding all the details of the session with the id given. Return data from the sessions table.

const getSessionDetails = async (session_id, session_type) => {
  const db = await getDbConnection();
  let query = '';
  if (session_type == 'post') {
    query = `SELECT * FROM SESSION WHERE id = '${session_id}'`
  } else if (session_type == 'requested') {
    query = `SELECT * FROM REQUEST_SESSION WHERE id = '${session_id}'`
  }
  const session = await db.get(query)
  await db.close()
  return session
}
// inserts in the sessions table the session_data given. Note the session_data parameter is an object that holds the session columns like the author and the content.
// returns metadata about the inserted row
const addSession = async (session_data, post) => {
  const db = await getDbConnection();
  if (!post) {
    const meta = await db.run(`insert into request_session('requester_id', 'title', 'description', 'Duration','Date','startBid','currentBid') 
    values ('${session_data.id}','${session_data.title}','${session_data.description}','${session_data.Duration}','${session_data.Date}','${session_data.startBid}','${session_data.startBid}')`);
    await db.close()
    return meta
  } else {
    const meta = await db.run(`insert into session('title', 'description', 'Date', 'Duration','Type', 'price', 'tutor_id') 
    values ('${session_data.title}','${session_data.Description}','${session_data.Date}','${session_data.Duration}','${session_data.Type}','${session_data.Price}','${session_data.id}')`);
    await db.close()
    return meta
  }

}
// updates the sessions table with the data given. 
// Note that the data parameter is an object that holds the session columns like the author and the content 
// And returns metadata about the updated row.
// const likesession = async (session_id) => {
//   const db = await getDbConnection();
//   const meta = await db.run(`update sessions set likes = likes + 1 where id = ${session_id}`)
//   await db.close()
//   return meta
// }



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

// inserts in the sessions table the session_data given. Note the session_data parameter is an object that holds the session columns like the author and the content.
// returns metadata about the inserted row
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
// AHMAD ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Get a user's details from the database. Do not return the password. Return data from the user table.
const getUserDetails = async (user_id) => {
  const db = await getDbConnection();
  // get all columns except password
  const user = await db.get('SELECT id, email, username, name, rating, dob, bio, profilePicture, pref_subject FROM user WHERE id = ?', [user_id])
  await db.close()
  return user
}

// Query the database to return the details of the attendees of the session with the id given. Return data from the session_attendee table.
const getSessionAttendees = async (session_id) => {
  let attendees = []
  const db = await getDbConnection();
  const attendees_ids = await db.all('SELECT user_id FROM session_attendee WHERE session_id = ?', [session_id])
  for (const element of attendees_ids) {
    // get attenedee details using getUserDetails function
    const attendee = await getUserDetails(element.user_id)
    attendees.push(attendee)
  }
  await db.close()
  return attendees
}

// Add a new attendee to the session_attendee table. Return metadata about the inserted row.
const addSessionAttendee = async (session_id, user_id) => {
  const db = await getDbConnection();
  const meta = await db.run('INSERT INTO session_attendee(session_id, user_id) VALUES (?,?)', [session_id, user_id])
  await db.close()
  return meta
}

export default {
  getSessionAttendees,
  addSessionAttendee,
  getAllRequestedSessions,
  getUserSessions,
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
  getUserSessionsRequested,
  getUserRating,
  getOwnerPosted,
  getOwnerRequested,
  updateProfile,
  registerSession,
  getSessionRating,
  getSubjects,

}