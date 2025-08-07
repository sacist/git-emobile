const { getAllUsers } = require('../services/get-all-users-paginated');
const BaseController = require('#Classes/base-controller');

class GetAllUsersController extends BaseController {
    get querySchema() {
        return {
            type: 'object',
            additionalProperties: false,
            properties: {
                page: { type: 'string', pattern: '^[1-9][0-9]*$' }, // только числа в строке
            },
        };
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

module.exports = new GetAllUsersController().run;
