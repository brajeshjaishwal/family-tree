import constants from '../constants/tree'
import proxy from '../api/api'

const { AddMember, AddMember_Success, AddMember_Failure, 
        FetchFamily, FetchFamily_Success, FetchFamily_Failure } = constants

export const addFamilyMemberAction = function ({name, relation, parent}) {
    const request = proxy.post('addFamilyMember', {name, relation, parent})
    return async (dispatch) => {
        dispatch(addFamilyMemberStarted())
        try{
            let resp = await request
            let member = await resp.data
            dispatch(addFamilyMemberSucceded(member))
        }catch(error) {
            dispatch(addFamilyMemberFailed(error))
        }
    }
    function addFamilyMemberStarted() { return { type: AddMember, error: ''} }
    function addFamilyMemberSucceded(member) { return { type: AddMember_Success, payload: { member, loading: false } } }
    function addFamilyMemberFailed(error) { return { type: AddMember_Failure, payload: { error, loading: false}}}
}

export const fetchFamilyMembersAction = function ({parent}) {
    const request = proxy.get(`fetchFamilyMembers/:${parent}`)
    return async (dispatch) => {
        dispatch(fetchFamilyMembersStarted())
        try{
            let resp = await request
            let members = await resp.data
            dispatch(fetchFamilyMembersSucceded(members))
        }catch(error) {
            dispatch(fetchFamilyMembersFailed(error))
        }
    }
    function fetchFamilyMembersStarted() { return { type: FetchFamily } }
    function fetchFamilyMembersSucceded(members) { return { type: FetchFamily_Success, payload: { members, loading: false } } }
    function fetchFamilyMembersFailed(error) { return { type: FetchFamily_Failure, payload: { error, loading: false}}}
}