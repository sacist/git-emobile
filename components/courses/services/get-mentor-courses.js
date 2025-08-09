const { client } = require('#Libs/db/databse')

const getMentorCourses = async (userId) => {
  const user = await client.oneOrNone(
    'SELECT role FROM users WHERE id = $1',
    [userId]
  );
  if (!user || user.role !== 'mentor') {
    return null
  }

  const courses = await client.any(
    `SELECT c.*
     FROM courses c
     JOIN user_courses uc ON uc.course_id = c.id
     WHERE uc.user_id = $1`,
    [userId]
  );

  return courses
};

module.exports = getMentorCourses
