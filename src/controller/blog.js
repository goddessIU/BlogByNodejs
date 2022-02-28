const getList = () => {
    return {
        res: 'hello'
    }
}

const getDetail = () => {
    return {
        res: 'detail'
    }
}

const newBlog = () => {
    return {
        res: 'new'
    }
}

const updateBlog = () => {
    return {
        res: 'update'
    }
}

const delBlog = () => {
    return {
        res: 'del'
    }
}


module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}