const { getBook, getBookParams, postBook, deleteBook, putBook } = require('../controller/book.js')

const Book = {
    type: 'object',
    properties: {
        id: {type: 'integer'},
        created_at: {type: 'string'},
        book_name: {type: 'string'},
        author: {type: 'string'}
    }
}

const getBookOpts = {
    schema: {
        response: {
            200: {
                type: 'array',
                book: Book
            }
        }
    },
    handler: getBook
}

const getBookParamsOpts = {
    schema: {
        response: {
            200: Book
        }
    },
    handler: getBookParams
}

const postBookOpts = {
    schema: {
        body: {
            type: 'object',
            required: ['book_name', 'author'],
            properties: {
                book_name: {type: 'string'},
                author: {type: 'string'}
            }
        },
        response: {
            201: Book
        }
    },
    handler: postBook
}

const deleteBookOpts = {
    schema: {
        body: {
            type: 'object',
            required: [ 'id' ],
            properties: {
                id: {type: 'integer'}
            }
        },
        response: {
            202: Book
        }
    },
    handler: deleteBook
}


const putBookOpts = {
    schema: {
        body: {
            type: 'object',
            required: [ 'id', 'book_name'],
            properties: {
                id: {type: 'integer'},
                book_name: {type: 'string'}
            }
        },
        response: {
            202: Book
        }
    },
    handler: putBook
}


module.exports = (app, opt, done) => {
    // BOOK MODULE

    app.get('/book', getBookOpts)
    app.get('/book/:id', getBookParamsOpts)
    app.post('/book', postBookOpts)
    app.delete('/book', deleteBookOpts)
    app.put('/book', putBookOpts)
    
    done()
}