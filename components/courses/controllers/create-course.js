const createCourse=require('#Components/courses/services/create-course.js')
const BaseController=require('#Classes/base-controller.js')

class CreateCourseController extends BaseController{
    get bodySchema(){
        return{
            type:"object",
            additionalProperties:false,
            properties:{
                title:{type:'string',pattern:'^.{0,255}$'},
                price:{type:'number'}
            },
            required: ["title", "price"]
        }
    }
    async controller(req,res,next){
        const {title,price}=req.body

        await createCourse(title,price)

        return {message:'ok'}
    }
}

module.exports=new CreateCourseController().run