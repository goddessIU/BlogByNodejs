const redis = require('redis')

const REDISCONFIG = require('../config/REDISCONFIG')
const { host, port } = REDISCONFIG
const client = redis.createClient(port, host)
client.on('error', (err) => {
    console.error(err)
})
// client.connect()
function get(key) {
    const promise = new Promise((resolve, reject) => {
        client.get(key, (err, val) => {
            if (err) {
                reject(err)
                return
            }
            if (val === null) {
                resolve(null)
                return
            }
            try {
                resolve(
                    JSON.parse(val)
                )
            } catch(e) {
                resolve(val)
            }
        })
    })
    return promise
}
function set(key, val) {
    if (typeof val === 'object') {
        val = JSON.stringify(val)
    }
    client.set(key, val, redis.print)
}

module.exports = {
    get, 
    set
}