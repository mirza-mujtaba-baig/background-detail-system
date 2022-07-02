const express = require("express");
const managerController = require("../Controllers/managerController");
const managerRouter = express.Router();

managerRouter.get("/getAllUsers", managerController.getAllUsers);
managerRouter.get("/getUserDetails/:emp_id", managerController.getUserDetails);
managerRouter.put("/approveuser/:emp_id", managerController.approveUser);
managerRouter.put("/rejectuser/:emp_id", managerController.rejectUser);

module.exports = managerRouter;
