const { getUser, getUserParams, addUser, deleteUser, putUser } = require('../controller/user.js')

const User = {
    type: 'object',
    properties: {
        id: {type: 'integer'},
        username: {type: 'string'},
        age: {type: 'integer'}
    }
}

const getUserOpts = {
    schema: {
        response: {
            200: {
                type: 'array',
                user: User
            }
        }
    },
    handler: getUser
}

const getUserParamsOpts = {
    schema: {
        response: {
            200: User
        }
    },
    handler: getUserParams
}

const postUserOpts = {
    schema: {
        body:{
            type: 'object',
            required: ['username', 'age'],
            properties:{
                username: {type: 'string'},
                age: {type: 'integer'}
            }
        },
        response: {
            201: User
        }
    },
    handler: addUser
}

const deleteUserOpts = {
    schema: {
        response: {
            202: {
                type: 'object',
                message: {type: 'string'}
            }
        }
    },
    handler: deleteUser
}


const putUserOpts = {
    schema: {
        body:{
            type: 'object',
            required: ['username', 'id'],
            properties: {
                username: {type: "string"},
                id: {type: "integer"}
            }
        },
        response: {
            200: User
        }
    },
    handler: putUser
}


module.exports = (app, opt, done) => {
    // USER MODULE

    app.get('/users', getUserOpts )
    app.get('/users/:id', getUserParamsOpts)
    app.post('/users', postUserOpts)
    app.delete('/users', deleteUserOpts)
    app.put('/users', putUserOpts)

    done()
}