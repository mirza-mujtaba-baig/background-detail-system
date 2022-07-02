const db = require("../Models");

const basicDetails = db.emp_basic_details;

//create

const saveBasicDetails = (req, res) => {
  basicDetails
    .findOne({ where: { emp_id: req.body.emp_id } })
    .then((result) => {
      if (result) {
        basicDetails
          .update(
            {
              full_name: req.body.full_name,
              father_husband_name: req.body.father_husband_name,
              contact_no: req.body.phone_no,
              date_of_birth: req.body.date_of_birth,
              marital_status: req.body.marital_status,
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
              message: "Something went wrong",
            });
          });
      } else {
        if (
          !req.body.full_name ||
          !req.body.email ||
          !req.body.father_husband_name ||
          !req.body.phone_no
        ) {
          res.status(400).json({
            message: "please enter all credentials",
          });
          return;
        }
        // console.log(result,'in else');

        // insert method
        const userInfo = {
          emp_id: req.body.emp_id,
          full_name: req.body.full_name,
          father_husband_name: req.body.father_husband_name,
          email: req.body.email,
          contact_no: req.body.phone_no,
          date_of_birth: req.body.date_of_birth,
          marital_status: req.body.marital_status,
        };

        basicDetails
          .create(userInfo)
          .then((result) => {
            res.status(200).json({
              message: "Saved Successfully",
              user: result,
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({
              message: err.message || "Something went wrong",
            });
          });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Something went wrong",
      });
    });
};

const getBasicDet = (req, res) => {
  basicDetails
    .findOne({ where: { emp_id: req.params.emp_id } })
    .then((result) => {
      return res.status(200).json({
        message: "user found",
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

module.exports = {
  saveBasicDetails,
  getBasicDet,
};
