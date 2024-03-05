const Routes = require("express").Router()
const Books = require('./api/books')
const Users = require('./api/users')

Routes.use("/api/books", Books)
Routes.use("/api/users", Users)

module.exports = Routes

