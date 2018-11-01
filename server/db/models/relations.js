const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const RelationSchema = new Schema({
    //we can break name field into first name, middle name and last name
    relation: String,
    parent: Schema.Types.ObjectId,
    children: [Schema.Types.ObjectId]
})

module.exports = Mongoose.model('Relation', RelationSchema)