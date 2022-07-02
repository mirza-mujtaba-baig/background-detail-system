const db = require("../Models");

const educationDetails = db.emp_education_details;

//create

const addEducation = (req, res) => {
  educationDetails
    .findOne({ where: { emp_id: req.body.emp_id } })
    .then((result) => {
      if (result) {
        educationDetails
          .update(
            {
              education: req.body.education,
              start_date: req.body.start_date,
              end_date: req.body.end_date,
              roll_no: req.body.roll_no,
              name_address_college: req.body.name_address_college,
              name_address_university: req.body.name_address_university,
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
          !req.body.education ||
          !req.body.start_date ||
          !req.body.roll_no ||
          !req.body.end_date
        ) {
          res.status(400).json({
            message: "please enter all credentials",
          });
          return;
        }

        // insert method
        const educationInfo = {
          emp_id: req.body.emp_id,
          education: req.body.education,
          start_date: req.body.start_date,
          end_date: req.body.end_date,
          roll_no: req.body.roll_no,
          name_address_college: req.body.name_address_college,
          name_address_university: req.body.name_address_university,
        };

        educationDetails
          .create(educationInfo)
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

const getEducationDet = (req, res) => {
  educationDetails
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

module.exports = {
  addEducation,
  getEducationDet,
};
