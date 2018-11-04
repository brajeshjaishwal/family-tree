let initialState = {
    node: {
        name:'',
        relation: '',
        node: [
            {
                name:'Brajesh',
                relation: 'father',
                node: []
            },
            {
                name: 'Shakun',
                relation: 'mother',
                node: []
            }
        ],
    },
    token: '',
    loading: false,
    error: ''
}

export default initialState