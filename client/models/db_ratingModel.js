// We should move all queires related to rating here..
import { Database } from 'sqlite3'
import { open } from 'sqlite'

// open the database
const getDbConnection = async () => {
  return await open({
    filename: './database.db3',
    driver: Database
  })
}
const addRating = async (rater_id, tutor_id, rating, comment, date) => {

  const db = await getDbConnection();
  let meta = '';
  try {
    meta = await db.run(`INSERT INTO RATING('rater_id', 'tutor_id', 'rating', 'comment', 'date') 
    values (?,?,?,?,?)`, [rater_id, tutor_id, rating, comment, date])

  } catch (e) {
    meta = { msg: 'There is a problem', changes: 0 }
  } finally {
    await db.close()
  }
  return meta
}
const getRatingsCount = async (user_id) => {

  const db = await getDbConnection();
  let meta = '';
  try {
    meta = await db.get(`SELECT count(rating) as count, SUM(rating) as sum FROM RATING where tutor_id = ${user_id}`)
  } catch (e) {
    meta = { msg: 'There is a problem', changes: 0 }
  } finally {
    await db.close()
  }
  return meta
}
const updateUserRating = async (user_id, rating) => {
  const db = await getDbConnection();
  let meta = '';
  try {
    meta = await db.run(`UPDATE USER SET rating = '${rating}' WHERE id = '${user_id}'`)
  } catch (e) {
    meta = { msg: 'There is a problem', changes: 0 }
  } finally {
    await db.close()
  }
  return meta
}
module.exports = {
  addRating,
  getRatingsCount,
  updateUserRating,
}