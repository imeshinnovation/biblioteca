const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    "name": { type: String },
    "lastname": { type: String },
    "typedoc": { type: String },
    "identification": { type: Number, unique: true },
    "date_birthday": { type: String },
    "email": { type: String, unique: true },
    "phonenumber": { type: Number },
    "program": { type: String },
    "facultad": { type: String },
    "type_user": { type: String },
    "state": { type: Boolean, default: false },
    "password": { type: String },
    "totp": { type: String },
    "a2f": { type: Number, default: 0 },
    "date_record": { type: String }
})

module.exports = mongoose.model('Users', userSchema)
