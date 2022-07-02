const db = require("../Models");

const addressDetails = db.emp_address_details;

//create

const addAddress = (req, res) => {
  addressDetails
    .findOne({ where: { emp_id: req.body.emp_id } })
    .then((result) => {
      if (result) {
        addressDetails
          .update(
            {
              residential_address: req.body.residential_address,
              employement_address: req.body.employement_address,
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
        if (!req.body.employement_address || !req.body.residential_address) {
          res.status(400).json({
            message: "please enter all credentials",
          });
          return;
        }

        // insert method
        const addressInfo = {
          emp_id: req.body.emp_id,
          residential_address: req.body.residential_address,
          employement_address: req.body.employement_address,
        };

        addressDetails
          .create(addressInfo)
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

const getAddressDetails = (req, res) => {
  addressDetails
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
  addAddress,
  getAddressDetails,
};
