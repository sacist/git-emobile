import {client} from '../../../libs/db/databse.js'


export const changeNameSurname=async (name,surname,id) => {
    try {
        await client.none(`UPDATE users SET name=$1,surname=$2 WHERE id=$3`,[name,surname,id])
    } catch (e) {
        console.log(e);
        throw e
    }
}