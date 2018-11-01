const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const UserSchema = new Schema({
    //we can break name field into first name, middle name and last name
    name: {
        type: String,
        require: true
    },
    //email //omitted for brevity
    password: {
        type: String
    }
})

module.exports = Mongoose.model('User', UserSchema)