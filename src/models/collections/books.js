const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookSchema = new Schema({
    "name_book": String,
    "author": String,
    "editor": String,
    "date_public": String ,
    "description": String ,
    "genre": String ,
    "isbn": String ,
    "pages": Number ,
    "poster": String,
    "edition": String,
    "tag": String,
    "language": String,
    "quantity": String,
    "date_record": String,
    "status": { type: Number, default: 1 }
})

module.exports = mongoose.model('Books', bookSchema)