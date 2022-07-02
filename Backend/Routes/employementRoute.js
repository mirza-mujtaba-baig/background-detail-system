const express=require('express')
const employementController=require('../Controllers/employementController')
const employementRouter=express.Router();

 employementRouter.post('/addemployement',employementController.addEmployementDetails)
 employementRouter.get('/getemployement/:emp_id',employementController.getEmployementDetails)

module.exports=employementRouter