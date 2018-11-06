const { AddMember, GetMembers } = require('../db/index')

const addMember = async (req, res) => {
    try{
        let { member } = req.body
        let user = req.user
        let tempMember = await AddMember(user._id, member)
        return res.send({member: tempMember})
    }catch(Error){
        return res.send({user: null, message: 'some error occurred.'})
    }
}

const getMembers = async (req, res) => {
    try {
        let { member } = req.body
        const user = req.user
        let members = await GetMembers({user: user._id, parent: member.parent})
        return res.send({members})
    } catch (Error) {
        return res.send({})
    }
}

module.exports = { addMember, getMembers }