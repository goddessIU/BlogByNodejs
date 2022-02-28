/**
 * @处理有关blog的路由
 * 
 */
const { SuccessModel, FailModel } = require('../model/resModel')
const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog')

const loginCheck = (req) => {
    if (!req.session.username) {
        return Promise.resolve(
            new FailModel('尚未登录')
        )
    }
}

const handleBlogRouter = (req) => {
    const method = req.method
    const path = req.path
    const query = req.query
    const blogData = req.body
    const id = query.id
    if (method === 'GET' && path === '/api/blog/list') {
        let author = query.author || ''
        const keyword = query.keyword || ''
        if (req.query.isadmin === '1') {
            const loginCheckResult = loginCheck(req)
            if (loginCheckResult) {
                return loginCheckResult
            }
            author = req.session.username
        }
        return getList(author, keyword).then(data => {
            return new SuccessModel(data)
        })
    }
    if (method === 'GET' && path === '/api/blog/detail') {
        return getDetail(id).then(data => {
            return new SuccessModel(data)
        })
    }
    if (method === 'POST' && path === '/api/blog/new') {
        const loginCheckResult = loginCheck(req)
        if (loginCheckResult) {
            return loginCheckResult
        }
        return newBlog(blogData, req.session.username).then(data => {
            return new SuccessModel(data)
        })
    }
    if (method === 'POST' && path === '/api/blog/update') {
        const loginCheckResult = loginCheck(req)
        if (loginCheckResult) {
            return loginCheckResult
        }
        return updateBlog(id, blogData).then(data => {
            if (data) {
                return new SuccessModel('更新成功')
            } else {
                return new FailModel('更新失败')
            }
        })
    }
    if (method === 'POST' && path === '/api/blog/del') {
        const loginCheckResult = loginCheck(req)
        if (loginCheckResult) {
            return loginCheckResult
        }
        const author = req.session.username || ''
        return delBlog(id, author).then(data => {
            if (data) {
                return new SuccessModel('删除成功')
            } else {
                return new FailModel('删除失败')
            }
        })
    }
}

module.exports = handleBlogRouter