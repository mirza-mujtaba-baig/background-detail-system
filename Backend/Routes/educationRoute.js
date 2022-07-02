const express=require('express')
const educationController=require('../Controllers/educationController')
const educationRouter=express.Router();

educationRouter.post('/addeducation',educationController.addEducation)
educationRouter.get('/geteducation/:emp_id',educationController.getEducationDet)

module.exports=educationRouter