const checkRoleMiddleware=require('./check-role')
const AuthorizationMiddleware=require('./authorization')
const ErrorsMiddleware=require('./error')

module.exports={checkRoleMiddleware,AuthorizationMiddleware,ErrorsMiddleware}