const db = require("../Models");
const multer = require("multer");
const path = require("path");
const { nextTick } = require("process");
const fs = require("fs");

const miscellaneousDetails = db.emp_miscellaneous_details;

// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(
//       null,
//       "C:Usersmirza.baigDesktopFull Stack Assessment Project\bgv-system-managementpublic\files"
//     );
//   },
//   filename: (req, file, callback) => {
//     callback(null, new Date() + path.extname(file.originalname));
//   },
// });

// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 1000000 },
//   fileFilter: (req, file, callback) => {
//     const fileTypes = /jpeg|png|jpg|gif|pdf|doc/;
//     const mimeType = fileTypes.test(file.mimetype);
//     const extname = fileTypes.test(path.extname(file.originalname));

//     if (mimeType && extname) {
//       return callback(null, true);
//     }
//     callback("Give proper file format to upload");
//   },
// }).single("file_doc");

const addMiscellaneous = (req, res) => {
  console.log("in method", req.body, req.files);
  miscellaneousDetails
    .findOne({ where: { emp_id: req.body.emp_id } })
    .then((result) => {
      // let fileOriginalName = "";
      // let fileName="";
      // let filePath="";

      // for (let i = 0; i < req.files.length; i++) {
      //   if (i == 0) {
      //     filesNames = req.files[i].originalname;
      //   } else {
      //     filesNames = filesNames + "," + req.files[i].originalname;
      //   }
      // }
      if (result) {
        miscellaneousDetails
          .update(
            {
              file_original_name: req.files[0].originalname,
              file_name: req.files[0].filename,
              file_path: req.files[0].path,
              gap_details: req.body.gap_details,
              additional_info: req.body.additional_info,
            },
            { where: { emp_id: req.body.emp_id } }
          )
          .then((response) => {
            res.status(200).json({
              message: "Updated Successfully",
              response: response,
              user: result,
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({
              message: "Something went wrong in find",
            });
          });
      } else {
        if (!req.body.gap_details || !req.files) {
          res.status(400).json({
            message: "please enter all credentials",
          });
          return;
        }
        // console.log(result,'in else');
        // let filesName = "";

        // for (let i = 0; i < req.files.length; i++) {
        //   if (i == 0) {
        //     filesName = req.files[i].originalname;
        //   } else {
        //     filesName = filesName + "," + req.files[i].originalname;
        //   }
        // }
        // insert method
        const miscellaneousInfo = {
          emp_id: req.body.emp_id,
          file_original_name: req.files[0].originalname,
          file_name: req.files[0].filename,
          file_path: req.files[0].path,
          gap_details: req.body.gap_details,
          additional_info: req.body.additional_info,
        };

        miscellaneousDetails
          .create(miscellaneousInfo)
          .then((result) => {
            console.log(result);

            res.status(200).json({
              message: "Saved Successfully",
              user: result,
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({
              message: err.message + "Something went wrong in 2",
            });
          });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message + "Something went wrong in 1st",
      });
    });
};

const getMiscDetails = (req, res) => {
  miscellaneousDetails
    .findOne({ where: { emp_id: req.params.emp_id } })
    .then((result) => {
      return res.status(200).json({
        message: "details found",
        user: result,
      });
    })
    .catch((error) => {
      res.status(400).json({
        message: "something went wrong",
        err: error,
      });
    });
};

const getFile = async (req, res, next) => {
  let awaRes = await miscellaneousDetails.findAll({
    where: { emp_id: req.params.emp_id },
    attributes: ["file_name"],
  });

  let fileName = awaRes[0].dataValues.file_name;

  let createFilePath = "./files/" + fileName;
  let filePath = createFilePath;
  var stream = fs.createReadStream(filePath);
  // var filename = "sample-pdf-with-images.pdf";
  // Be careful of special characters

  //filename = encodeURIComponent(filename);

  // res.setHeader("Content-disposition", 'inline; filename="' + filename + '"');
  // res.setHeader("Content-type", "application/pdf");
  stream.pipe(res);
};

module.exports = {
  addMiscellaneous,
  getMiscDetails,
  getFile,
};
