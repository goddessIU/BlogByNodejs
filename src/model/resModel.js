class Model {
    constructor(data, message) {
        if (typeof data === 'string') {
            this.data = message
            data = null;
            message = null;
        }
        if (data) {
            this.data = data
        }
        if (message) {
            this.message = message
        }
    }
}

class SuccessModel extends Model {
    constructor(data, message) {
        super(data, message)
        this.errno = 0
    }
}

class FailModel extends Model {
    constructor(data, message) {
        super(data,message) 
        this.errno = 1
    }
}
module.exports  = {
    SuccessModel,
    FailModel
}