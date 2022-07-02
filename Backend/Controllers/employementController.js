
const db = require("../Models");


const employementDetails = db.emp_employement_details;

//create

const addEmployementDetails = (req, res) => {
  console.log( 'in method',req.body);
    employementDetails.findOne({ where: { emp_id: req.body.emp_id } })
    .then((result) => {
        console.log('if  details found');
      if (result) {
         employementDetails.update({
          employer_name: req.body.employer_name,
          previous_employee_id: req.body.previous_employee_id,
          employer_ph_no:req.body.employer_phone_no,
          job_title:req.body.job_title,
          date_of_joining:req.body.joining_date,
          date_of_leaving:req.body.leaving_date,
          gross_ctc:req.body.gross_ctc,
         },{where:{emp_id:req.body.emp_id}}).then(response=>{
            res.status(200).json({
            message:"Updated Successfully",
            response:response,
            user:result
        })
         }).catch(err=>{
           console.log(err);
          res.status(500).json({
            message: "Something went wrong",
          });
         })
       
      } else {
        console.log('if  details not found');

        if (!req.body.employer_name || !req.body.previous_employee_id || !req.body.job_title ) {
          res.status(400).json({
            message: "please enter all credentials",
          });
          return;
        }
// console.log(result,'in else');


     // insert method
            const employementInfo = {
              emp_id: req.body.emp_id,
              employer_name: req.body.employer_name,
              previous_employee_id: req.body.previous_employee_id,
              employer_ph_no:req.body.employer_phone_no,
              job_title:req.body.job_title,
              date_of_joining:req.body.joining_date,
              date_of_leaving:req.body.leaving_date,
              gross_ctc:req.body.gross_ctc,
            };

            employementDetails.create(employementInfo)
              .then((result) => {
                console.log(result);
              
             
                  res.status(200).json({
                      message:"Saved Successfully",
                      user:result
                  })
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

const getEmployementDetails=(req,res)=>{
  employementDetails.findOne({where:{emp_id:req.params.emp_id}}).then(result=>{
    return res.status(200).json({
      message:"details found",
      user:result
    })
    }).catch(error=>{
      res.status(400).json({
        message:"something went wrong",
        err:error
      })
  })
}

module.exports = {
    addEmployementDetails,
    getEmployementDetails
  
};

