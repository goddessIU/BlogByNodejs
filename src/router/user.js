/**
 * @description 处理与用户信息有关的路由
 * 
 */
const { SuccessModel, FailModel } = require('../model/resModel')
const handleUserRouter = (req) => {
    const method = req.method
    const path = req.path
    if (method === 'POST' && path === '/api/user/login') {
        const res = 'ok'
        return new SuccessModel(res)
    }
}

module.exports = handleUserRouter