const mongoose = require('mongoose')
const Schema = mongoose.Schema

const loanBookSchema = new Schema({
    "name_user": { type: String },
    "id_book": { type: String },
    "id_user": { type: Number },
    "loan_date": { type: String }, //03-03-2024
    "deadline": { type: String },
    "status": { type: String, default: "Pending" }
})

module.exports = mongoose.model('loanBooks', loanBookSchema)