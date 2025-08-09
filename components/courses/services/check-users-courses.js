const { client } = require('#Libs/db/databse');


const checkUserCourses = async (userId, courseId) => {
    try {
        const hasCourse = await client.oneOrNone(
            'SELECT 1 FROM user_courses WHERE user_id = $1 AND course_id = $2 LIMIT 1',
            [userId, courseId]
        )

        if (hasCourse) {
            return true
        } else {
            return false
        }
    } catch (e) {
        throw e
    }
}

module.exports=checkUserCourses