// Utilizar los Métodos HTTP

//const { Routes } = require('express')

/*
GET, PUT, DELETE, POST
*/
const Routes = require('express').Router()
const Books = require('../../controllers/')["Books"]


Routes.get('/count', async (req, res) => {
    res.json({ 'books': await Books.count() })
})

Routes.post('/add', async (req, res) => {
    res.json(await Books.addBook(req.body))
})

Routes.post('/findbook', async (req, res) => {
    res.json(await Books.findBook(req.body))
})

Routes.put('/updatebook', async (req, res) => {
    res.json(await Books.updateBook(req.body))
})

Routes.delete('/deletebook', async (req, res) => {
    res.json(await Books.deleteBook(req.body))
})

module.exports = Routes