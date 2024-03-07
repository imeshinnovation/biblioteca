const books = require('./collections/books')
const users = require('./collections/users')
const config = require('./collections/config')
const codes = require('./collections/codes')
const loanBook = require('./collections/loanBook')

const Coleccion = {
    books,
    users,
    config,
    codes,
    loanBook
}

module.exports = Coleccion
