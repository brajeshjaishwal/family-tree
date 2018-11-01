const Mongoose = require('mongoose')
const User = require('./models/user')
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

        let passwordHash;
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                passwordHash = hash;
            })
        })

        const newUser = await new User({name, passwordHash}).save();

        return {token: createToken(newUser)}
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

        return { token: createToken(user) }

    }catch(Error) {
        throw Error
    }
}

const GetChildren = async function({id}) {
    try{
        const user = await User.findById({id})
        if(user) {
            //user exist so it can have relations
            const children = await User.find({})
        }
    }catch(Error) {
        throw Error
    }
}

const AddChildren = async function({id}) {
    try{

    }catch(Error) {
        throw Error
    }
}

module.exports = { Connect, Login, Register, GetChildren, AddChildren }
