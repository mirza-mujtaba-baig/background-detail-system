const express=require('express')
const addressController=require('../Controllers/addressController')
const addressRouter=express.Router();

 addressRouter.post('/addaddress',addressController.addAddress)
 addressRouter.get('/getaddress/:emp_id',addressController.getAddressDetails)

module.exports=addressRouter