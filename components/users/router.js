const express = require('express');
const createUserController = require('./controllers/create-user');
const getAllUsersController = require('./controllers/get-all-users-paginated');
const { changeNameSurnameController } = require('./controllers/change-name-surname');
const authMiddleware=require('#Middleware/authorization.js')

const usersRouter = express.Router();

usersRouter.post('/users', createUserController);
usersRouter.get('/users', authMiddleware,getAllUsersController);
usersRouter.put('/users', changeNameSurnameController);

module.exports = { usersRouter };
