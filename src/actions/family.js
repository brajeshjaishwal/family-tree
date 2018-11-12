import constants from '../constants/family'
import { proxy, handleError } from '../api/api'

const { AddMember, AddMember_Success, AddMember_Failure, 
        FetchFamily, FetchFamily_Success, FetchFamily_Failure } = constants

export const addFamilyMemberAction = function ({name, relation, parent}) {
    var config = { headers: {
        'auth': sessionStorage.getItem('token'),
        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    }}
    const request = proxy.post('family/addmember', {name, relation, parent}, config)
    return async (dispatch) => {
        dispatch(addFamilyMemberStarted())
        try{
            let resp = await request
            let { member, message } = await resp.data
            if(member === null) {
                dispatch(addFamilyMemberFailed(message))    
            } else {
                dispatch(addFamilyMemberSucceded(member))
            }
        }catch(error) {
            let errorMessage = handleError(error)
            dispatch(addFamilyMemberFailed(errorMessage))
        }
    }
    function addFamilyMemberStarted() { return { type: AddMember, payload: {error: '', success: false, loading: true} } }
    function addFamilyMemberSucceded(member) { return { type: AddMember_Success, payload: { member, loading: false, success: true } } }
    function addFamilyMemberFailed(error) { return { type: AddMember_Failure, payload: { error, loading: false} }}
}

export const fetchFamilyMembersAction = function (parent) {
    var config = { headers: {
        'auth': sessionStorage.getItem('token'),
        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    }}
    const request = proxy.get(`family/getmembers/${parent}`, config)
    return async (dispatch) => {
        dispatch(fetchFamilyMembersStarted(parent))
        try{
            let resp = await request
            let result = await resp.data
            if(result.members === null) {
                dispatch(fetchFamilyMembersFailed(result.message))    
            } else {
                var members = []
                result.members.forEach(m => {
                    members.push({ key: m._id || m.id, parent: m.parent || -1, name: m.name, relation: m.relation })
                })
                dispatch(fetchFamilyMembersSucceded(members))
            }
        }catch(error) {
            let errorMessage = handleError(error)
            dispatch(fetchFamilyMembersFailed(errorMessage))
        }
    }
    function fetchFamilyMembersStarted(key) { return { type: FetchFamily, payload: { key, loading: key, error: '' } } }
    function fetchFamilyMembersSucceded(members) { return { type: FetchFamily_Success, payload: { members, loading: '' } } }
    function fetchFamilyMembersFailed(error) { return { type: FetchFamily_Failure, payload: { error, loading: ''}}}
}