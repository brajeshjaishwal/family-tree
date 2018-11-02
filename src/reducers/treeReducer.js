import initialState from './initialState'

const treeReducer = (state= initialState, action) => {
    switch(action.type) {
        default: 
            return { ...state }
    }
}

export default treeReducer