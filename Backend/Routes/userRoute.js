const express=require('express')
const userController=require('../Controllers/userController')
const userRouter=express.Router();

userRouter.post('/adduser',userController.addUser)
userRouter.post('/login',userController.login)

module.exports=userRouter