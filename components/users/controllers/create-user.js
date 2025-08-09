const { createUser } = require('../services/create-user');
const BaseController = require('#Classes/base-controller');
const {ConflictError}=require('#Errors')

class CreateUserController extends BaseController {
    get bodySchema() {
        return {
            type: 'object',
            required: ['name', 'surname', 'password', 'email'],
            additionalProperties: false,
            properties: {
                name: { type: 'string' },
                surname: { type: 'string' },
                email: { type: 'string', format: 'email' },
                password: {
                    type: 'string',
                    pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
                }
            }
        };
    }

    async controller(req,res,next) {
        try {  
            const userData = req.body;
            await createUser(userData);
            return { message: 'ok' };
        } catch (e) {
            if(e.code==='email_exists'){
                throw new ConflictError({code:'email_conflict',text:'такой email уже зарегестрирован'})
            }else{
                throw e
            }
        }
    }
}

module.exports = new CreateUserController().run;
