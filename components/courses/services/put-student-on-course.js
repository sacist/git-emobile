const { client } = require('#Libs/db/databse');

const putStudentOnCourse = async (userId, courseId) => {
  try {
    const res = await client.any('SELECT role FROM users WHERE id=$1', [userId]);
    if (!res[0] || res[0].role !== 'student') {
      return false;
    }

    const course = await client.oneOrNone('SELECT 1 FROM courses WHERE id=$1 LIMIT 1', [courseId]);
    if (!course) {
      return false;
    }

    await client.none(
      'INSERT INTO user_courses (user_id, course_id) VALUES ($1, $2)',
      [userId, courseId]
    );

    return true;
  } catch (e) {
    console.log(e);
    
    if (e.code === '23503'||e.code==='23505') {
      const err = new Error('Пользователь уже записан на этот курс');
      err.code = 'unique_violation';
      throw err;
    }
    throw e;
  }
};

module.exports = putStudentOnCourse;
