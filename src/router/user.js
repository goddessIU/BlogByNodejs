/**
 * @description 处理与用户信息有关的路由
 * 
 */
const { SuccessModel, FailModel } = require('../model/resModel')
const { login } = require('../controller/user')
const { set, get } = require('../db/redis')

const handleUserRouter = (req) => {
    const method = req.method
    const path = req.path
    const { username, password } = req.body
    if (method === 'POST' && path === '/api/user/login') {
        return login(username, password).then(data => {
            if (data.username) {
                req.session.username = data.username
                req.session.realname = data.realname
                set(req.sessionId, req.session)
                return new SuccessModel('登录成功')
            } else {
                return new FailModel('登录失败')
            }
        })
    }
}

module.exports = handleUserRouter