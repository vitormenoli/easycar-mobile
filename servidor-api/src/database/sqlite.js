import sqlite3 from 'sqlite3'

const SQLite = sqlite3.verbose()

function execute(command, params, method = 'all') {
    return new Promise((resolve, reject) => {
        db[method](command, params, (error, result) => {
            if (error) {
                reject(error)
            } else {
                resolve(result)
            }
        })
    })
}

const db = new SQLite.Database('./src/database/banco.db', SQLite.OPEN_READWRITE, (err) => {
    if (err) {
        return console.log("Database error: " + err.message)
    } else {
        return console.log("Database connected")
    }
        
})

export { db, execute }