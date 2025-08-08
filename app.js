const express = require('express');
const c = require('config');
const router = require('./router');
const { usersRouter } = require('#Components/users/router');
const {authRouter}=require('#Components/authorization/router')
const { client } = require('#Libs/db/databse');
const { createTables } = require('#Libs/db/create-tables');
const App = express();

App.use(express.json());
const redis=require('#Libs/redis/redis-connection.js') // Подключение редиса

App.use(router);
App.use(usersRouter);
App.use(authRouter)

createTables(client);

App.listen(c.get('SERVER.PORT'), () => {
    console.log(`Сервер запущен на порту ${c.get('SERVER.PORT')}`);
});
