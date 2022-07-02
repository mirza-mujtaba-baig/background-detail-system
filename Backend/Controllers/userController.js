const db = require("../Models");
const nanoid = require("nanoid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const Users = db.users_table;

//create

const addUser = (req, res) => {
  Users.findOne({ where: { email: req.body.email } })
    .then((result) => {
      console.log(result);
      if (result) {
        res.status(500).json({
          message: "Email already exist",
        });
      } else {
        console.log("yes", req.body);
        if (!req.body.name || !req.body.email || !req.body.password) {
          res.status(400).json({
            message: "please enter all credentials",
          });
          return;
        }

        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(req.body.password, salt, function (err, hash) {
            const userInfo = {
              emp_id: nanoid.nanoid(),
              name: req.body.name,
              email: req.body.email,
              password: hash,
              role: "employee",
              application_status: "pending",
            };

            Users.create(userInfo)
              .then((result) => {
                console.log(result);
                const token = jwt.sign(
                  {
                    emp_id: result.emp_id,
                  },
                  "this is secret message asdasdasd23423rsdf",
                  { expiresIn: 60 * 30 }
                );

                res.status(200).json({
                  message: "Successfully Registered",
                  token: token,
                  user: result,
                });
              })
              .catch((err) => {
                res.status(500).json({
                  message: "Something went wrong",
                });
              });
          });
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
      });
    });
};

const login = (req, res) => {
  console.log("login data", req.body);
  if (!req.body.email || !req.body.password) {
    res.status(400).json({
      message: "please enter credentials",
    });
    return;
  }

  Users.findOne({ where: { email: req.body.email } }).then((result) => {
    if (result === null) {
      res.status(401).json({
        message: "User does not exist",
      });
    } else {
      bcrypt.compare(req.body.password, result.password, (err, success) => {
        if (success) {
          const token = jwt.sign(
            {
              emp_id: result.emp_id,
            },
            "this is secret message asdasdasd23423rsdf",
            { expiresIn: 60 * 30 }
          );

          if (result.application_status === "pending") {
            res.status(200).json({
              message: "Authentication Successfull",
              token: token,
              user: result,
            });
          } else {
            res.status(401).json({
              message: "Action Taken on your Application. You Can't Login now",
            });
          }
        } else {
          res.status(401).json({
            message: "Check the credentials you entered",
          });
        }
      });
    }
  });
};

module.exports = {
  addUser,
  login,
};
