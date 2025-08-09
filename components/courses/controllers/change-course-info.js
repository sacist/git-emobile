const BaseController=require('#Classes/base-controller.js')
const {NotFoundError}=require('#Errors')
const changeCourseInfo=require('../services/change-course-info')

class ChangeCourseInfoController extends BaseController{
    get bodySchema(){
        return{
            type:"object",
            additionalProperties:false,
            properties:{
                title:{type:'string',pattern:'^.{0,255}$'},
                price:{type:'number'},
                courseId:{type:'number'}
            },
            required: ["title",'price','courseId']
        }
    }
    async controller(req){
        const {title,price,courseId}=req.body
        const updated=await changeCourseInfo(courseId,title,price)
        if(!updated){
            throw new NotFoundError({code:'course_not_found',text:'Курс не найден'})
        }
        return {message:'ok'}
    }
}

module.exports=new ChangeCourseInfoController().run