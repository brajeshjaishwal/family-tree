import globals from '../constants/family'

let initialState = {
    family: [{
        key: -1,
        name: 'Family Tree',
        relation: 'Root',
        parent: -1,
    }],
    key:'',
    loading: false,
    error: '',
    errorMessage: '',
    success: false,
}

function RemoveOldChildren(arr, parent) {
    return arr.filter(member => member.parent !== parent)
}

const familyReducer = (state= initialState, action) => {
    console.log('familyReducer', state)
    switch(action.type) {
        case globals.FetchFamily:
        case globals.FetchFamily_Failure:
            return { ...state, ...action.payload}
        case globals.FetchFamily_Success:
            let familyRoot = state.key === -1 ? [state.family[0]] : []
            let oldFiltered = RemoveOldChildren(state.family, state.key)//state.family.filter(f => f.parent === state.key)
            let tempfamily= [...familyRoot, ...oldFiltered, ...action.payload.members]
            //let newFamily = [...tempfamily, ...action.payload.members]
            console.log(tempfamily)
            return { ...state, 
                        family: [...tempfamily], 
                        loading: action.payload.loading,
                        error: action.payload.error}
        case globals.AddMember:
        case globals.AddMember_Failure:
        case globals.AddMember_Success:
            return { ...state, ...action.payload}
        default: 
            return { ...state }
    }
}

export default familyReducer