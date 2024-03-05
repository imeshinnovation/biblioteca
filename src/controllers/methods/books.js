const Books = require('../../models')["books"]
const Book = {
    count: async () => {
        return await Books.find({}).count()
    },
    addBook: async (body) => {
        const Libro = await Books.create(body)
        return Libro
    }
}

module.exports = Book