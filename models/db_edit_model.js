import { Database } from 'sqlite3'
import { open } from 'sqlite'

// open the database
const getDbConnection = async () => {
    return await open({
      filename: './database.db3',
      driver: Database
    })
  }


const editSession = async (session_data, Date, Time) => {
    const db = await getDbConnection();
    if(session_data.session_type == "post"){
        const meta = await db.run(`UPDATE SESSION SET title = '${session_data.title}', description = '${session_data.description}', Date = '${Date}', Time = '${Time}', Duration = '${session_data.Duration}', Type = '${session_data.type}', price = '${session_data.price}', tutor_id = '${session_data.id}' WHERE id = '${session_data.sessionID}'`)
        await db.close()
        return meta
    } else {
        let currentBid = await db.get(`SELECT currentBid FROM REQUEST_SESSION WHERE id = '${session_data.sessionID}'`)
        if (currentBid.currentBid == null) {
            console.log("in")
            const meta = await db.run(`UPDATE REQUEST_SESSION SET requester_id = '${session_data.id}', title = '${session_data.title}', description = '${session_data.description}', Duration = '${session_data.Duration}', Date = '${Date}', Time = '${Time}', startBid = '${session_data.startBid}'  WHERE id = '${session_data.sessionID}'`)
            await db.close()
            return meta
        }
        await db.close()
        return 0
    }
}













export default {
    editSession,

  }