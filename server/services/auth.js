const { Register, Login } = require('../db/index')

const welcome =  (req, res) => {
    return res.send('welcome')
}

const register = async (req, res) => {
    try{
        let {name, password} = req.body
        const result = await Register({name, password})
        return res.send({user: name, token: result.token})
    }catch(Error){
        return res.send({user: null, message: 'some error occurred.'})
    }
}

const login = async (req, res) => {
    try{
        let { name, password } = req.body
        const result = await Login({name, password})
        return res.send({user: name, token: result.token})
    }catch(Error)
    {
        return res.send({user: null, message: 'user does not exist.'})
    }
}

module.exports = { welcome, register, login } 
