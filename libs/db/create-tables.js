const query = `
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    surname VARCHAR(255),
    password VARCHAR(255),
    email VARCHAR(255) UNIQUE
);
`;

const createTables = async (client) => {
    try {
        client.none(query);
    } catch (e) {
        console.log(e);
    }
};

module.exports = { createTables };
