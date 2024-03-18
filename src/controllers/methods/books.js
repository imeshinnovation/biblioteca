const Books = require('../../models')["books"] //Importe el modelo Book
const helpers = require('../../libs/helpers') //Importa el modelo helpers 
const Book = {
    //busqueda conteo total 
    count: async () => {
        return await Books.find({}).count()   //Cuenta todos los libros en la base de datos  
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
        body.date_record = helpers.date_record()// asigna la fecha de registro del libro 
        const Libro = await Books.create(body) // Crea un nuevo libro en la base de datos
        return Libro
    },

    //Actualizar el libro solicitado
    updateBook: async (body) => {
        body.date_record = helpers.date_record() //actualiza la fecha del registro del libro
        return await Books.updateOne( { _id:body.id }, { $set:body } )   //actualiza los datos de los libros  en la base de datos
    },

    //Eliminar el libro solicitado
    deleteBook: async (body) => {
        return await Books.deleteOne( { _id:body.id } ) //Elimina el libro de la base de datos 
    }

}


module.exports = Book //exporta el controlador del Book