import uuidv4 from 'uuid/v4'

let initialState = {
    family: [{
        key: uuidv4(),
        name: '',
        relation: 'Family Tree',
        parent: 0,
    }],
    token: '',
    loading: false,
    error: ''
}

export default initialState