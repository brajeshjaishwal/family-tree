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

const createToken = async (user) => {
    //const { name, _id } = user
    //we are not considering email right now
    let token = await jwt.sign({ user }, SECRET, {expiresIn: '10hr'})
    return token
};

const GetCurrentUser = async (token) => {
    let user = null
    try{
        if(token === null || token === 'null' || token === undefined || token === '') {
            console.log('we dont have any token yet. lets wait.')
        }
        else{
            const result = await jwt.verify(token, SECRET)
            if(result)
                user = result.user
        }
    }catch(err) {
        console.log(err)
    }
    return user
}

const Register = async function({name, password}) {

    try {
        const user = await User.findOne({name});
        if (user) {
            throw new Error('User already exists');
        }
        let salt = await bcrypt.genSalt(10)
        let hash = await bcrypt.hash(password, salt)
        const newUser = await new User({name, password: hash}).save();
        let token = await createToken(newUser);
        return {user: newUser, token}
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
        const token = await createToken(user)
        return { user, token }
    }catch(Error) {
        throw Error
    }
}

const GetMembers = async function({user, parent}) {
    try{
        const parentid = parent !== "-1" ? parent : null;
        const members = await Family.find({user, parent: parentid})
        return { members }
    }catch(Error) {
        throw Error
    }
}

const AddMember = async function({user, parent, name, relation }) {
    try{
        const parentid = parent !== -1 ? parent : null;
        const temp = await new Family({ user, parent: parentid, name, relation }).save();
        return { member: temp }
    }catch(Error) {
        throw Error
    }
}

module.exports = { Connect, Login, Register, GetMembers, AddMember, GetCurrentUser }
