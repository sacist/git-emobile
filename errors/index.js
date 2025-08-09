const AuthorizationError = require('./auth-error');
const ValidationError = require('./validation-error');
const ConflictError=require('./conflict')
const NotFoundError=require('./not-found')
const ForbiddenError=require('./forbidden')

module.exports = { AuthorizationError, ValidationError,ConflictError,NotFoundError,ForbiddenError };