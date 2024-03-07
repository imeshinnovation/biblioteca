const Routes = require("express").Router()
const Books = require('./api/books')
const Users = require('./api/users')
const LoanBooks = require('./api/loanBooks')

Routes.use("/api/books", Books)
Routes.use("/api/users", Users)
Routes.use("/api/loanBooks", LoanBooks)

module.exports = Routes

