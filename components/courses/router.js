const express = require('express');
const CreateCourseController=require('./controllers/create-course')
const PutStudentOnCourseController=require('./controllers/put-student-on-course')
const {AuthorizationMiddleware,checkRoleMiddleware}=require('#Middleware')
const GetCourseInfoController=require('./controllers/get-course-info')
const ChangeCourseInfoController=require('./controllers/change-course-info')
const DeleteCourseController=require('./controllers/delete-course')
const GetMentorCoursesController=require('./controllers/get-mentor-courses')


const coursesRouter = express.Router();


coursesRouter.post('/courses',AuthorizationMiddleware,checkRoleMiddleware('mentor'),CreateCourseController)
coursesRouter.post('/student/new',AuthorizationMiddleware,checkRoleMiddleware('mentor'),PutStudentOnCourseController)
coursesRouter.get('/courses',AuthorizationMiddleware,GetCourseInfoController)
coursesRouter.put('/courses',AuthorizationMiddleware,checkRoleMiddleware('mentor'),ChangeCourseInfoController)
coursesRouter.delete('/courses',AuthorizationMiddleware,checkRoleMiddleware('admin'),DeleteCourseController)
coursesRouter.get('/courses/mentor',AuthorizationMiddleware,checkRoleMiddleware('mentor'),GetMentorCoursesController)

module.exports = { coursesRouter };