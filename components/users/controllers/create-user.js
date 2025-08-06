import { createUser } from "../services/create-user.js";
import BaseController from "#Classes/base-controller.js";


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
                password: { type: 'string', pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$" }
            }
        }
    }
    async controller(req) {
        const userData = req.body;
        await createUser(userData);
        return { message: 'ok' };
    }
}

export default new CreateUserController().run