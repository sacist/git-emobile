const { client } = require('#Libs/db/databse')

const deleteCourse = async (courseId) => {
    try {
        const result = await client.result(
            'DELETE FROM courses WHERE id = $1',
            [courseId]
        );
        return result.rowCount > 0
    } catch (e) {
        throw e
    }
};

module.exports = deleteCourse
