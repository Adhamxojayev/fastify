const db = require('../lib/postgres')


const getUser = async function (req,reply) {
    reply.send( await db.fetchAll('select * from users') )
}

const getUserParams = async function (req, reply) {
    reply.send( await db.fetch('select * from users where id = $1', req.params.id))
}

const addUser = async function (req, reply) {
    const { username, age } = req.body
    reply.send( await db.fetch( 'insert into users (username, age ) values ($1, $2) returning *', username, age ) )
}

const deleteUser = async function (req, reply) {
    let user = await db.fetch( 'delete from users where id = $1 returning *', req.body.id )
    reply.send( {message: `this ${user.username} has been deleted ` } )
}

const putUser = async function (req, reply) {
    const { username, id } = req.body
    reply.send( await db.fetch( 'update users set username = $1 where id = $2 returning * ', username, id ) )
}

module.exports = {
    getUser,
    getUserParams,
    addUser,
    deleteUser,
    putUser
}