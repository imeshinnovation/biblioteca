//este modulo contiene los metodos relacionados con lo libros, usuarios  y prestamos
//importamos los metodos de los libros, usuarios y prestamos 
const Books = require('./methods/books') //metodo para libros
const Users = require('./methods/users') //metodo usuarios
const LoanBooks = require('./methods/loanBook') //metodo pretamos

const Metodos = {
    Books,
    Users,
    LoanBooks
}

module.exports = Metodos