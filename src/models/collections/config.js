const mongoose = require("mongoose")
const Schema = mongoose.Schema

const configSchema = new Schema({
    "email": { type: String, unique: true },
    "password": { type: String },
    "date_record": { type: String }
})

module.exports = mongoose.model('Config', configSchema)