const stripToken = (token) => {
    if (token.startsWith('Bearer:')) {
        token = token.split(' ')[1]
    }
    return token
}

module.exports=stripToken