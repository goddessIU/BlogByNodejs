const { exec } = require('../db/mysql')

const login = (username, password) => {
    let sql = `
        SELECT username, realname FROM users WHERE username='${username}' AND password='${password}';
    `
    return exec(sql).then(rows => {
        return rows[0] || {}
    })
}

module.exports = {
    login
}