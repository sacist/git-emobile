const BaseController=require('#Classes/base-controller.js')
const {ForbiddenError,NotFoundError}=require('#Errors')
const checkUserCourses=require('../services/check-users-courses')
const getCourseInfo=require('../services/get-course-info')

class GetCourseInfoController extends BaseController{
    get querySchema(){
        return {
            type: 'object',
            additionalProperties: false,
            properties: {
                courseId: { type: 'string', pattern: '^[1-9][0-9]*$' }, 
            },
            required:['courseId']
        };
    }
    
    async controller(req){
        const courseId=req.query.courseId
        const {id,role}=req.state.user
        
        if(role==='student'){
            const isStudentOnCourse=await checkUserCourses(id,parseInt(courseId))
            if(!isStudentOnCourse){
                throw new ForbiddenError({code:'access_denied',text:'доступ запрещен'})
            }
        }
        const info=await getCourseInfo(courseId)
        if(!info){
            throw new NotFoundError({code:'course_not_found',text:'Курс не найден'})
        }
        return info
    }
}

module.exports=new GetCourseInfoController().run