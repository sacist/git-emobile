const express = require('express');
const c = require('config');
const router = require('./router');
const { usersRouter } = require('#Components/users/router');
const { client } = require('#Libs/db/databse');
const { createTables } = require('#Libs/db/create-tables');

const App = express();

App.use(express.json());

App.use(router);
App.use(usersRouter);

createTables(client);

App.listen(c.get('SERVER.PORT'), () => {
    console.log(`Сервер запущен на порту ${c.get('SERVER.PORT')}`);
});
