const { Register, Login } = require('../db/index')

const welcome =  (req, res) => {
    return res.send('welcome')
}

const register = async (req, res) => {
    try{
        let {name, password} = req.body
        const {user, token} = await Register({name, password})
        req.user = user
        return res.send({user: user.name, token})
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

module.exports = { welcome, register, login } 
