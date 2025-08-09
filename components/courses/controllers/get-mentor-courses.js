const BaseController = require('#Classes/base-controller');
const getMentorCourses = require('../services/get-mentor-courses');
const {NotFoundError}=require('#Errors')

class GetMentorCoursesController extends BaseController {
    get querySchema() {
        return {
            type: 'object',
            required: ['userId'],
            additionalProperties: false,
            properties: {
                userId: { type: 'string', pattern: '^[1-9][0-9]*$' }
            }
        };
    }

    async controller(req) {
        const { userId } = req.query;
        const courses = await getMentorCourses(parseInt(userId));
        if(!courses){
            throw new NotFoundError({code:'mentor_courses_not_found',text:'Курсы данного ментора не найдены'})
        }
        return { courses };
    }
}

module.exports = new GetMentorCoursesController().run;
