const mysql = require('mysql')

const MYSQLCONFIG = require('../config/MYSQLCONFIG')

const connection = mysql.createConnection(MYSQLCONFIG)

connection.connect((err) => {
    if (err) {
        console.error(err)
        return
    }
})


const exec = (sql) => {
    const promise = new Promise((reslove, reject) => {
        connection.query(sql, (err, res) => {
            if (err) {
                reject(err)
            }
            reslove(res)
        })
    })
    return promise
}   

module.exports = {
    exec
}