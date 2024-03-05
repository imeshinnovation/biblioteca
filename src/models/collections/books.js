const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookSchema = new Schema({
    "name_book": { type: String },
    "author": { type: String },
    "editor": { type: String },
    "date_public": { type: String },
    "description": { type: String },
    "genre": { type: String },
    "isbn": { type: String },
    "pages": { type: Number },
    "poster": { type: String },
    "edition": { type: String },
    "tag": { type: String },
    "language": { type: String },
    "quantity": { type: String },
    "date_record": { type: String }
})

module.exports = mongoose.model('Books', bookSchema)