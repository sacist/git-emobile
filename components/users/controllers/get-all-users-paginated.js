import { getAllUsers } from "../services/get-all-users-paginated.js";
import BaseController from "#Classes/base-controller.js";


class GetAllUsersController extends BaseController {
    get querySchema() {
        return {
            type: 'object',
            additionalProperties: false,
            properties: {
                page: { type: 'string', pattern: '^[1-9][0-9]*$' }, // только числа в строке
            },
        }
    }
    async controller(req) {
        const query = { ...req.query };
        if (!query.page) {
            query.page = '1';
        }
        const page = parseInt(query.page);
        const users = await getAllUsers(page, 10);

        return users;
    }
}

export default new GetAllUsersController().run;