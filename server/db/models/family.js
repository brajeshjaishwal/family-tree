const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const FamilySchema = new Schema({
    //we can break name field into first name, middle name and last name
    user: Schema.Types.ObjectId,
    name: String,
    relation: String,
    parent: Schema.Types.ObjectId
})

module.exports = Mongoose.model('Fammily', FamilySchema)