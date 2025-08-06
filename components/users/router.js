import express from 'express'
import { createUserController } from './controllers/create-user.js'
import { getAllUsersController } from './controllers/get-all-users-paginated.js'
import { changeNameSurnameController } from './controllers/change-name-surname.js'

export const usersRouter=express.Router()

usersRouter.post('/users',createUserController)
usersRouter.get('/users',getAllUsersController)
usersRouter.put('/users',changeNameSurnameController)