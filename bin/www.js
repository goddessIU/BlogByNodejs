/**
 * @description 建立服务器连接
 * 
 */
const http = require('http')
const handleCreateServer = require('../src/app');


const PORT = 8000
const server = http.createServer(handleCreateServer)

server.listen(PORT)
