const express = require('express');
const LoginController=require('./controllers/login-controller')
const GetNewTokensController=require('./controllers/get-new-tokens-controller')

const authRouter = express.Router();

authRouter.post('/login',LoginController)
authRouter.post('/refresh',GetNewTokensController)

module.exports = { authRouter };