/**
 * @处理有关blog的路由
 * 
 */
const { SuccessModel, FailModel } = require('../model/resModel')

const handleBlogRouter = (req) => {
    const method = req.method
    const path = req.path
    const query = req.query
    if (method === 'GET' && path === '/api/blog/list') {
        const res = 'ok'
        return new SuccessModel(res)
    }
    if (method === 'GET' && path === '/api/blog/detail') {
        const res = 'ok'
        return new SuccessModel(res)
    }
    if (method === 'POST' && path === '/api/blog/new') {
        const res = 'ok'
        return new SuccessModel(res)
    }
    if (method === 'POST' && path === '/api/blog/update') {
        const res = 'ok'
        return new SuccessModel(res)
    }
    if (method === 'POST' && path === '/api/blog/del') {
        const res = 'ok'
        return new SuccessModel(res)
    }
}

module.exports = handleBlogRouter