const { client } = require('#Libs/db/databse');

const changeCourseInfo = async (courseId, title, price) => {
    try {
        const result = await client.result('UPDATE courses SET title=$1, price=$2 WHERE id=$3',[title, price, courseId])
        if (result.rowCount === 0) {
            return false
        }
        return true
    } catch (e) {
        throw e
    }
}

module.exports=changeCourseInfo