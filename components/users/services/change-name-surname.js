const { client } = require('../../../libs/db/databse');

const changeNameSurname = async (name, surname, id) => {
    try {
        await client.none(`UPDATE users SET name=$1, surname=$2 WHERE id=$3`, [name, surname, id]);
    } catch (e) {
        throw e;
    }
};

module.exports = { changeNameSurname };
