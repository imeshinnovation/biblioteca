const mongoose = require("mongoose")
const Schema = mongoose.Schema

const codeSchema = new Schema({
    "email": { type: String, unique: true },
    "code": { type: String },
    "date_record": { type: String }
})

module.exports = mongoose.model('Codes', codeSchema)