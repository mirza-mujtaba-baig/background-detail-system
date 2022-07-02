const express=require('express')
const basicDetailsController=require('../Controllers/basicDetailsController')
const basicDetailsRouter=express.Router();

 basicDetailsRouter.post('/addbasicdetails',basicDetailsController.saveBasicDetails)
 basicDetailsRouter.get('/getbasicdetails/:emp_id',basicDetailsController.getBasicDet)

module.exports=basicDetailsRouter