const BaseController = require('#Classes/base-controller')
const deleteCourse = require('../services/delete-course')
const { NotFoundError } = require('#Errors')

class DeleteCourseController extends BaseController {
    get bodySchema() {
        return {
            type: 'object',
            additionalProperties: false,
            properties: {
                courseId: { type: 'number' }
            },
            required: ['courseId']
        };
    }

    async controller(req, res) {
        const { courseId } = req.body

        const deleted = await deleteCourse(courseId)
        if (!deleted) {
            throw new NotFoundError({ code: 'course_not_found', text: 'Курс не найден' })
        }

        return { message: 'ok' }
    }
}

module.exports = new DeleteCourseController().run
