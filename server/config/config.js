let config = {
    PORT : '3000',
    SECRET: '35625&*^%%67$%hjh%^BrajeshJaishwal',
    DBURL: 'mongodb://brajesh:myfamily123@ds147073.mlab.com:47073/myfamily',
}

const Initialize = function() {
    ['PORT', 'SECRET', 'DBURL'].map(param => {
        if(process.env[param]) {
            config[param] = process.env[param]
        }
    })
    return config
}

module.exports = { Initialize, config }