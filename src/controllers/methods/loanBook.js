const loanBooks = require('../../models')["loanBook"] //Importamos el modelos loanBooks
const loanBook = {
    countAll: async () => {
        return await loanBooks.find().count() // Aqui contamos todos los prestamos en la base de datos
    },
    countMonth: async (body) => { //"04-03-2024" - "03"
        return await loanBooks.find({ loan_date: {$regex: "-"+body.month+"-"}  }).count() //Contamos los prestamos por mes especifico
    }
}

module.exports = loanBook //exportamos el controlador loanBook