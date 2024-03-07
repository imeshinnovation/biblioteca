const Books = require('../../models')["books"]
const Book = {
    //busqueda conteo total 
    count: async () => {
        return await Books.find({}).count()
    },
    // filtro nombre, versión, autor y genero; donde me informe que disponibilidad de unidades existen, que refleje la fecha del préstamo
    findBook: async (body) => {
        const { filter, finder } = body
        switch (filter) {
            case 'name_book':
                return await Books.find({ name_book: finder }).lean()
                break;
            case 'author':
                return await Books.find({ author: finder }).lean()
                break;
            case 'editor':
                return await Books.find({ editor: finder }).lean()
                break;
            case 'genre':
                return await Books.find({ genre: finder }).lean()
                break;
        }
    },

    // agregar 
    addBook: async (body) => {
        const Libro = await Books.create(body)
        return Libro
    }






}


module.exports = Book