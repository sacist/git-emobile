const express = require('express');
const LoginController=require('./controllers/login-controller')
const GetNewTokensController=require('./controllers/get-new-tokens-controller')
const {checkRoleMiddleware,AuthorizationMiddleware}=require('#Middleware')
const authRouter = express.Router();

authRouter.post('/login',LoginController)
authRouter.post('/refresh',AuthorizationMiddleware,checkRoleMiddleware('student'),GetNewTokensController)

module.exports = { authRouter };