const Mongoose = require('mongoose')
const User = require('./models/user')
const Family = require('./models/family')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {SECRET, DBURL} = require('../config/config').config

const Connect = function() {
    Mongoose.Promise = global.Promise
    try {
        Mongoose.connect(DBURL, { useNewUrlParser: true }).then(() => {
            console.log('database running.')
        }).catch((err) => {
            console.log(`error: ${err} occurred while connecting to database.`)
        });
    }catch(Error) {
        throw Error
    }
}

const createToken = (user) => {
    const { name } = user;
    //we are not considering email right now
    return jwt.sign({ name, /*email*/ }, SECRET, {expiresIn: '1hr'});
};

const Register = async function({name, password}) {

    try {
        const user = await User.findOne({name});
        if (user) {
            throw new Error('User already exists');
        }
        let salt = await bcrypt.genSalt(10)
        let hash = await bcrypt.hash(password, salt)
        const newUser = await new User({name, password: hash}).save();
        return {user: newUser, token: createToken(newUser)}
    }catch(Error) {
        throw Error
    }
}

const Login = async function({name, password}) {
    try {
        const user = await User.findOne({name});
        if (!user) {
            throw new Error('User not found');
        };
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            throw new Error('Invalid password')
        }
        return { user, token: createToken(user) }
    }catch(Error) {
        throw Error
    }
}

const GetMembers = async function({user, parent}) {
    try{
        const members = await Family.find({user, parent})
        return { members }
    }catch(Error) {
        throw Error
    }
}

const AddMember = async function({user, member}) {
    try{
        const { parent, name, relation } = member
        const temp = await new Family({ user, parent, name, relation }).save();
        return { member: temp }
    }catch(Error) {
        throw Error
    }
}

module.exports = { Connect, Login, Register, GetMembers, AddMember }
