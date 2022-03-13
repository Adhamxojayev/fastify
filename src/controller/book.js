const db = require('../lib/postgres')

const getBook = async function (req, reply) {
    reply.send( await db.fetchAll('select * from book') )
}

const getBookParams = async function (req, reply) {
    reply.send( await db.fetch('select * from book where id = $1', req.params.id) )
}

const postBook = async function (req, reply) {
    const { book_name, author } = req.body
    reply.send( await db.fetch('insert into book (book_name, author) values ($1, $2) returning * ', book_name, author) )
}

const deleteBook = async function (req, reply) {
    reply.send( await db.fetch( 'delete from book where id = $1 returning *', req.body.id ) )
}

const putBook = async function (req, reply) {
    const { book_name, id} = req.body
    reply.send( await db.fetch( 'update book set book_name = $1 where id = $2 returning *', book_name, id ) )
}

module.exports = {
    getBook,
    getBookParams,
    postBook,
    deleteBook,
    putBook
}
