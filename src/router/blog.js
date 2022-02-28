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
    const blogData = req.body
    const id = query.id
    if (method === 'GET' && path === '/api/blog/list') {
        const author = query.author || ''
        const keyword = query.keyword || ''
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
        return newBlog(blogData).then(data => {
            return new SuccessModel(data)
        })
    }
    if (method === 'POST' && path === '/api/blog/update') {
        return updateBlog(id, blogData).then(data => {
            if (data) {
                return new SuccessModel('更新成功')
            } else {
                return new FailModel('更新失败')
            }
        })
    }
    if (method === 'POST' && path === '/api/blog/del') {
        const author = query.author || ''
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