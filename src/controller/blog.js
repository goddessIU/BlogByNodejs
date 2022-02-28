const { exec } = require('../db/mysql')

const getList = (author, keyword) => {
    let sql = `SELECT * FROM blogs WHERE 1=1 `
    if (author) {
        sql += `AND author=${author} `
    }
    if (keyword) {
        sql += `AND title LIKE '%${keyword}%' `
    }
    sql += `ORDER BY createtime DESC;`
    return exec(sql)
}

const getDetail = (id) => {
    let sql = `SELECT * FROM blogs WHERE id=${id}`
    return exec(sql).then(raws => {
        return raws[0]
    })
}

const newBlog = (blogData = {}) => {
    let sql = `INSERT INTO blogs (title, content, createtime, author) VALUES ('${blogData.title}', '${blogData.content}', ${Date.now()}, '${blogData.author}');`
    return exec(sql).then(insertData => {
        return {
            id: insertData.insertId
        }
    })
}

const updateBlog = (id, blogData = {}) => {
    let sql = `UPDATE blogs SET title='${blogData.title}', content='${blogData.content}' WHERE id=${id};`
    return exec(sql).then(updateData => {
        if (updateData.affectedRows > 0) {
            return true
        } else {
            return false
        }
    })
}

const delBlog = (id, author) => {
    let sql = `DElETE FROM blogs WHERE id=${id} AND author='${author}'`
    return exec(sql).then(delData => {
        if (delData.affectedRows > 0) {
            return true
        } else {
            return false
        }
    })
}


module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}