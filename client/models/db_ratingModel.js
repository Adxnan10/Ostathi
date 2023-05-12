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
module.exports = {
  addRating,
}