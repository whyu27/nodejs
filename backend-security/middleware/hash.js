const bcrypt = require('bcryptjs')

const hash = async(password) => {
    return await bcrypt.hash(password, 5)
}

const verify = async(password, hash) => {
    return await bcrypt.compare(password, hash)
}

module.exports = {
    hash, 
    verify
}