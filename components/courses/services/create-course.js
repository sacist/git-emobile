const { client } = require('#Libs/db/databse');

const createCourse=async (title,price) => {
    try {
        await client.none(`INSERT INTO courses (title,price) VALUES ($1,$2)`,[title,price])
        return true
    } catch (e) {
        throw e
    }
}

module.exports=createCourse