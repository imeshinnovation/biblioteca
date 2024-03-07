// Utilizar los Métodos HTTP

/*
GET, PUT, DELETE, POST
*/
const Routes = require('express').Router()
const LoanBooks = require('../../controllers/')["LoanBooks"]


Routes.get('/countAll', async (req, res) => {
    res.json({ 'loanBooks': await LoanBooks.countAll() })
})


module.exports = Routes