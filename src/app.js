/**
 * @description 用来建立总的服务器逻辑程序
 * @author george
 */

const querystring = require('querystring')

const handleBlogRouter = require('./router/blog')
const handleUserRouter = require('./router/user')

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
                if (!postData) {
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
handleCreateServer = (req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    const url = req.url
    const path = url.split('?')[0]
    const query = url.split('?')[1]
    req.path = path
    req.query = query
    getPostData(req).then(postData => {
        req.body = postData
        const blogRes = handleBlogRouter(req)
        if (blogRes) {
            res.end(
                JSON.stringify(blogRes)
            );
            return
        }
        const userRes = handleUserRouter(req)
        if (userRes) {
            res.end(
                JSON.stringify(userRes)
            )
            return
        }
        res.end(
            'wrong'
        )
    })
    
    res.writeHead(404, { 'Content-type': 'text/plain' })
    res.write('404 not found\n')
    res.end()
}

module.exports = handleCreateServer