const { client } = require('../../../libs/db/databse');

const createUser = async (userData) => {
    try {
        const { name, surname, password, email } = userData;
        const hashPassword = password; // если будешь хешировать — замени здесь
        await client.none(
            `INSERT INTO users (name, surname, password, email) VALUES ($1, $2, $3, $4)`,
            [name, surname, hashPassword, email]
        );
        return true;
    } catch (e) {
        console.log(e);
        throw e;
    }
};

module.exports = { createUser };
