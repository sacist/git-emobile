const { client } = require('#Libs/db/databse.js')

const getSessionByToken = async (token) => {
    try {
        if (token.startsWith('Bearer:')) {
            token = token.split(' ')[1]
        }
        
        const user = await client.any(`
        SELECT u.id,u.name,u.surname,u.email,r.expire
        FROM users u
        JOIN refresh_tokens r ON r.user_id = u.id
        WHERE r.token = $1
        LIMIT 1;
        `,[token])
        if(user){
            return user[0]
        }
        return user
    } catch (e) {
        throw e
    }
}

module.exports=getSessionByToken