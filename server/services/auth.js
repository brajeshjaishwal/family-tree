const { Register, Login, GetCurrentUser } = require('../db/index')

const welcome =  (req, res) => {
    return res.send('welcome')
}

const register = async (req, res) => {
    try{
        let {name, password} = req.body
        await Register({name, password})
        return res.send()
    }catch(Error){
        return res.send({user: null, message: 'some error occurred.'})
    }
}

const login = async (req, res) => {
    try{
        let { name, password } = req.body
        const {user, token} = await Login({name, password})
        req.user = user
        return res.send({user: user.name, token})
    }catch(Error)
    {
        return res.send({user: null, message: 'user does not exist.'})
    }
}

const authenticate = async (req, res, next) => {
        var token = req.headers['auth']
        console.log(`auth header: ${token}`)
        var user = await GetCurrentUser(token)
        if(user !== null && user !== undefined) {
            req.user = user
        }
        next()
}

module.exports = { welcome, register, login, authenticate } 
