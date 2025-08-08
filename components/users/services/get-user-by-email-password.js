const { client } = require('#Libs/db/databse');
const SHA256=require('#Helpers/SHA256')

const getUsersByEmailAndPAsswordService=async(email,password) => {
    try {
        const hashPassword=SHA256(password)
        const user=await client.any(`SELECT * FROM users WHERE email =$1 AND password =$2`,[email,hashPassword])
        return user[0]
    } catch (e) {
        throw e
    }
}

module.exports=getUsersByEmailAndPAsswordService