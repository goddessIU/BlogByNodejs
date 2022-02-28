/**
 * @处理有关blog的路由
 * 
 */
const handleBlogRouter = (req) => {
    const method = req.method
    const path = req.path
    const query = req.query
    if (method === 'GET' && path === '/api/blog/list') {
        return 'success'
    }
    if (method === 'GET' && path === '/api/blog/detail') {
        return 'detail'
    }
    if (method === 'POST' && path === '/api/blog/new') {
        return 'new'
    }
    if (method === 'POST' && path === '/api/blog/update') {
        return 'update'
    }
    if (method === 'POST' && path === '/api/blog/del') {
        return 'del'
    }
}

module.exports = handleBlogRouter