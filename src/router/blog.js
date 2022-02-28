/**
 * @处理有关blog的路由
 * 
 */
const { SuccessModel, FailModel } = require('../model/resModel')
const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog')


const handleBlogRouter = (req) => {
    const method = req.method
    const path = req.path
    const query = req.query
    if (method === 'GET' && path === '/api/blog/list') {
        const res = getList()
        return new SuccessModel(res)
    }
    if (method === 'GET' && path === '/api/blog/detail') {
        const res = getDetail()
        return new SuccessModel(res)
    }
    if (method === 'POST' && path === '/api/blog/new') {
        const res = newBlog()
        return new SuccessModel(res)
    }
    if (method === 'POST' && path === '/api/blog/update') {
        const res = updateBlog()
        return new SuccessModel(res)
    }
    if (method === 'POST' && path === '/api/blog/del') {
        const res = delBlog()
        return new SuccessModel(res)
    }
}

module.exports = handleBlogRouter