/**
 * @description 用来建立总的服务器逻辑程序
 * @author george
 */
const querystring = require('querystring')

const handleBlogRouter = require('./router/blog')
const handleUserRouter = require('./router/user')
const { set, get } = require('./db/redis')

//设置cookie时限
const getCookieExpires = () => {
    const d = new Date()
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
    return d.toGMTString()
}
//处理POST的BODY
const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        if (req.method === 'GET') {
            resolve({})
            return
        }
        if (req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }
        if (req.method === 'POST') {
            let postData = ''
            req.on('data', chunk => {
                postData += chunk.toString()
            })
            req.on('end', () => {
                if (postData === '') {
                    resolve({})
                    return
                } else {
                    resolve(JSON.parse(postData))
                    return
                }
            })
        }
    })
    return promise
}

//建立http服务器
const handleCreateServer = (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    const url = req.url
    const path = url.split('?')[0]
    const query = url.split('?')[1]
    req.path = path
    req.query = querystring.parse(query)
    //设置cookie
    req.cookie = {}
    const cookieStr = req.headers.cookie || ''
    cookieStr.split(';').forEach(item => {
        if (!item) return;
        const arr = item.split('=')
        const key = arr[0].trim()
        const val = arr[1].trim()
        req.cookie[key] = val
    })
    //设置session
    let needSetCookie = false
    let userId = req.cookie.userid;
    if (!userId) {
        needSetCookie = true
        userId = `${Date.now()}_${Math.random()}`
        set(userId, {})
    }
    req.sessionId = userId
    get(req.sessionId).then(data => {
        if (data === undefined || data === null) {
            set(req.sessionId, {})
            req.session = {}
        } else {
            if (data === {}) req.session = {}
            else req.session = data
        }
        return getPostData(req)
    })
    .then(postData => {
        req.body = postData
        const blogRes = handleBlogRouter(req)
        if (blogRes) {
            blogRes.then(blogData => {
                if (needSetCookie) {
                    res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                }
                res.end(
                    JSON.stringify(blogData)
                )
            })
            return;
        }
        const userRes = handleUserRouter(req)
        if (userRes) {
            userRes.then(userData => {
                if (needSetCookie) {
                    res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                }

                res.end(
                    JSON.stringify(userData)
                )
            })
            return
        }
        res.writeHead(404, { 'Content-type': 'text/plain' })
        res.write('404 not found\n')
        res.end()
    })
}

module.exports = handleCreateServer