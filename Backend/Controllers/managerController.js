const db = require("../Models");

const userTable = db.users_table;
const basicDetails = db.emp_basic_details;
const educationDetails = db.emp_education_details;
const employementDetails = db.emp_employement_details;
const addressDetails = db.emp_address_details;
const miscellaneousDetails = db.emp_miscellaneous_details;

const getAllUsers = (req, res) => {
  userTable
    .findAll({ where: { application_status: "pending", role: "employee" } })
    .then((result) => {
      return res.status(200).json({
        message: "users found",
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

const getUserDetails = async (req, res) => {
  const allDetails = {
    basic: {},
    address: {},
    employement: {},
    education: {},
    miscellaneous: {},
  };
  allDetails.basic = await basicDetails.findOne({
    where: { emp_id: req.params.emp_id },
  });
  allDetails.employement = await employementDetails.findOne({
    where: { emp_id: req.params.emp_id },
  });
  allDetails.address = await addressDetails.findOne({
    where: { emp_id: req.params.emp_id },
  });
  allDetails.education = await educationDetails.findOne({
    where: { emp_id: req.params.emp_id },
  });
  allDetails.miscellaneous = await miscellaneousDetails.findOne({
    where: { emp_id: req.params.emp_id },
  });
  res.status(200).json({
    message: "details found",
    user: allDetails,
  });
};

const approveUser = (req, res) => {
  userTable
    .update(
      { application_status: "approved" },
      { where: { emp_id: req.params.emp_id } }
    )
    .then((result) => {
      res.status(200).json({
        message: "approved successfully",
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: err.message,
      });
    });
};

const rejectUser = (req, res) => {
  userTable
    .update(
      { application_status: "rejected" },
      { where: { emp_id: req.params.emp_id } }
    )
    .then((result) => {
      res.status(200).json({
        message: "rejected successfully",
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: err.message,
      });
    });
};

module.exports = {
  getAllUsers,
  getUserDetails,
  approveUser,
  rejectUser,
};
