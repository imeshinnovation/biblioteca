const Books = require('../../models')["books"]
const helpers = require('../../libs/helpers')
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
                return await Books.find({ name_book: { $regex:finder } }).lean()
                break;
            case 'author':
                return await Books.find({ author: { $regex:finder } }).lean()
                break;
            case 'editor':
                return await Books.find({ editor: { $regex:finder } }).lean()
                break;
            case 'genre':
                return await Books.find({ genre: { $regex:finder } }).lean()
                break;
        }
    },

    // agregar 
    addBook: async (body) => {
        body.date_record = helpers.date_record()
        const Libro = await Books.create(body)
        return Libro
    },

    //Actualizar el libro solicitado
    updateBook: async (body) => {
        body.date_record = helpers.date_record()
        return await Books.updateOne( { _id:body.id }, { $set:body } )   
    },

    //Eliminar el libro solicitado
    deleteBook: async (body) => {
        return await Books.deleteOne( { _id:body.id } )
    }

}


module.exports = Book