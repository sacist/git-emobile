const { client } = require('#Libs/db/databse.js')
const redis=require('#Libs/redis/redis-connection.js')
const getSessionByToken = async (token, tokenType) => {
    try {
        if (tokenType === 'access') {
            const user = await redis.get(`token_${token}`)

            return JSON.parse(user)
        } else {
            const user = await client.any(`
            SELECT u.id,u.name,u.surname,u.email,r.expire,u.role
            FROM users u
            JOIN refresh_tokens r ON r.user_id = u.id
            WHERE r.token = $1
            LIMIT 1;
            `, [token])
            if (user) {
                return user[0]
            }
            return user
        }

    } catch (e) {
        console.log(e);
        throw e
    }
}

module.exports = getSessionByToken