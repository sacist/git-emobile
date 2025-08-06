import {client} from '../../../libs/db/databse.js'


export const getAllUsers=async (page,maxUsersOnPage) => {
    try {
        const offset=(page-1)*maxUsersOnPage
        const users=await client.manyOrNone(`SELECT * FROM users LIMIT $1 OFFSET $2`,[maxUsersOnPage,offset])
        return users
    } catch (e) {
        console.log(e);
        throw e
    }
}