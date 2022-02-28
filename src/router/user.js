/**
 * @description 处理与用户信息有关的路由
 * 
 */

const handleUserRouter = (req) => {
    const method = req.method
    const path = req.path
    if (method === 'POST' && path === '/api/user/login') {
        return 'true'
    }
}

module.exports = handleUserRouter