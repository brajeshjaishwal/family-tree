const { AddMember, GetMembers } = require('../db/index')

const addMember = async (req, res) => {
    try{
        let { parent, name, relation } = req.body
        let user = req.user
        if(!user) throw Error("You are not logged in.")
        let member = await AddMember({user: user._id, parent, name, relation})
        return res.send({ member })
    }catch(Error){
        return res.send({ member: null, message: Error.message})
    }
}

const getMembers = async (req, res) => {
    try {
        const { parentid } = req.params
        const user = req.user
        if(!user) throw Error("You are not logged in.")
        let result = await GetMembers({user: user._id, parent: parentid})
        return res.send({members: result.members})
    } catch (Error) {
        return res.send({members: null, message: Error.message})
    }
}

module.exports = { addMember, getMembers }