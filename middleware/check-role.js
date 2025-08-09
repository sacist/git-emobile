const Config = require('config');
const {ForbiddenError}=require('#Errors')
const rolesConfig = Config.get('ROLES');

const roleLevels = Object.values(rolesConfig).reduce((acc, role) => {
    acc[role.NAME] = role.LEVEL;
    return acc;
}, {});

const checkRoleMiddleware = (minRoleName) => {
    return (req, _, next) => {
        try { 
            
            const userRole = req.state.user.role;
            
            if (roleLevels[userRole] < roleLevels[minRoleName]) {
                throw new Error('Forbidden')
            }
    
            next();
        } catch (error) {
            return next(new ForbiddenError({code:'not_enough_rights',text:'Недостаточно прав'}))
        }
    };
};

module.exports = checkRoleMiddleware;
