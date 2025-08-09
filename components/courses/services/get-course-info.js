const { client } = require('#Libs/db/databse');


const getCourseInfo=async (courseId) => {
    try {
        const courseInfo=await client.one(`SELECT * FROM courses WHERE id=$1`,[courseId])

        if(!courseInfo){
            return false
        }
        return courseInfo
    } catch (e) {
        throw e
    }
}

module.exports=getCourseInfo