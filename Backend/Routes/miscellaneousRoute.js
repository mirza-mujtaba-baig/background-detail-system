const express = require("express");
const miscellaneousController = require("../Controllers/miscellaneousController");
const miscellaneousRouter = express.Router();
const multer = require("multer");

const upload = multer({
  dest: "files/",
});

miscellaneousRouter.post(
  "/addmiscellaneous",
  upload.array("files"),
  miscellaneousController.addMiscellaneous
);

miscellaneousRouter.get(
  "/getmiscellaneous/:emp_id",
  miscellaneousController.getMiscDetails
);

miscellaneousRouter.get("/getfile/:emp_id", miscellaneousController.getFile);
module.exports = miscellaneousRouter;
