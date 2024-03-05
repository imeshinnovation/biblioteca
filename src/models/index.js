const books = require('./collections/books')
const users = require('./collections/users')
const config = require('./collections/config')
const codes = require('./collections/codes')

const Coleccion = {
    books,
    users,
    config,
    codes
}

module.exports = Coleccion
