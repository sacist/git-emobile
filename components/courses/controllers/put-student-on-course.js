const putStudentOnCourse=require('../services/put-student-on-course')
const BaseController=require('#Classes/base-controller.js')
const {NotFoundError,ConflictError}=require('#Errors')

class PutStudentOnCourseController extends BaseController{
    get bodySchema(){
        return{
            type:"object",
            additionalProperties:false,
            properties:{
                userId:{type:'number'},
                courseId:{type:'number'}
            },
            required: ["userId", "courseId"]
        }
    }
    async controller(req,res,next){
        try {
            const {userId,courseId}=req.body
            const studentGotOnCourse=await putStudentOnCourse(userId,courseId)
            if(!studentGotOnCourse){
                throw new NotFoundError({code:'not_found',text:'курс или студент не найдены'})
            }
            return({message:'ok'})
        } catch (e) {
            if(e.code==='unique_violation'){
                throw new ConflictError({code:'user_already_on_the_course',text:'Пользователь уже записан на этот курс'})
            }else{
                throw e
            }
        }
    }
}

module.exports=new PutStudentOnCourseController().run