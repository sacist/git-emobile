const { client } = require('#Libs/db/databse');
const SHA256=require('#Helpers/SHA256')

const createUser = async (userData) => {
  try {
    const { name, surname, password, email } = userData
    const hashPassword = SHA256(password)
    await client.none(
      `INSERT INTO users (name, surname, password, email) VALUES ($1, $2, $3, $4)`,
      [name, surname, hashPassword, email]
    );
    return true
  } catch (e) {
    if (e.code === '23505') {
      const err = new Error()
      err.code = 'email_exists'
      throw err
    }
    throw e
  }
};


module.exports = { createUser }
