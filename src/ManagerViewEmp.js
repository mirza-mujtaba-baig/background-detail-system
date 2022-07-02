import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";

function ManagerViewEmp() {
  const navigate = useNavigate();
  const emp_id = useParams();
  let pdfUrl = `http://localhost:4000/api/miscellaneous/getfile/${emp_id.employee_id}`;

  const [basicDetailsObj, setbasicDetailsObj] = useState({
    emp_id: "",
    full_name: "",
    father_husband_name: "",
    email: "",
    contact_no: "",
    date_of_birth: "",
    marital_status: "",
  });

  const [educationDetails, seteducationDetails] = useState({
    emp_id: "",
    education: "",
    start_date: "",
    end_date: "",
    roll_no: "",
    name_address_college: "",
    name_address_university: "",
  });

  const [employementDetails, setemployementDetails] = useState({
    emp_id: "",
    employer_name: "",
    previous_employee_id: "",
    employer_phone_no: "",
    job_title: "",
    joining_date: "",
    leaving_date: "",
    gross_ctc: "",
  });

  const [addressDet, setaddressDet] = useState({
    emp_id: "",
    residential_address: "",
    employement_address: "",
  });

  const [miscellaneousObj, setmiscellaneousObj] = useState({
    emp_id: "",
    gap_details: "",
    file_name: "",
    file_original_name: "",
    file_path: "",
    additional_info: "",
  });

  useEffect(() => {
    console.log(emp_id.employee_id);
    getEmpDetails();
  }, []);

  const getEmpDetails = () => {
    return fetch(
      `http://localhost:4000/api/manager/getUserDetails/${emp_id.employee_id}`,
      {
        method: "GET",
      }
    )
      .then((response) => {
        response.json().then((data) => {
          console.log(data.user);
          setbasicDetailsObj(data.user.basic);
          seteducationDetails(data.user.education);
          setemployementDetails(data.user.employement);
          setaddressDet(data.user.address);
          setmiscellaneousObj(data.user.miscellaneous);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container-fluid">
      <div className="card mt-3">
        <div className="card-header text-primary">
          Employee Details
          {/* <div className="  d-md-flex justify-content-md-end"> */}
          <button
            type="button"
            className="btn btn-outline-info ms-5"
            onClick={() => {
              navigate("/managerhome");
            }}
          >
            close
          </button>
          {/* </div> */}
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-6">
              <div className="card mt-3">
                <div className="card-header">Basic Details</div>
                <div className="card-body">
                  <h6> Full Name : </h6> {basicDetailsObj.full_name}
                  <h6> Father / Husband Name : </h6>{" "}
                  {basicDetailsObj.father_husband_name}
                  <h6> Email : </h6> {basicDetailsObj.email}
                  <h6> Phone No : </h6> {basicDetailsObj.contact_no}
                  <h6> Date Of Birth : </h6> {basicDetailsObj.date_of_birth}
                  <h6> Marital Status : </h6> {basicDetailsObj.marital_status}
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="card mt-3">
                <div className="card-header">Educational Details</div>
                <div className="card-body">
                  <h6> Education : </h6> {educationDetails.education}
                  <h6> Roll No : </h6> {educationDetails.roll_no}
                  <h6> Start Date : </h6> {educationDetails.start_date}
                  <h6> End Date : </h6> {educationDetails.end_date}
                  <h6> Name & Address of College : </h6>{" "}
                  {educationDetails.name_address_college}
                  <h6> Name & Address of University : </h6>{" "}
                  {educationDetails.name_address_university}
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="card mt-3">
                <div className="card-header">Employement Details</div>
                <div className="card-body">
                  <h6> Employer Name : </h6> {employementDetails.employer_name}
                  <h6> Previous Employee ID : </h6>{" "}
                  {employementDetails.previous_employee_id}
                  <h6> Employer Phone No : </h6>{" "}
                  {employementDetails.employer_ph_no}
                  <h6> Job Title : </h6> {employementDetails.job_title}
                  <h6> Joining Date : </h6> {employementDetails.date_of_joining}
                  <h6> Leaving Date : </h6> {employementDetails.date_of_leaving}
                  <h6> Gross CTC : </h6> {employementDetails.gross_ctc}
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="card mt-3">
                <div className="card-header">Address Details</div>
                <div className="card-body">
                  <h6> Residential Address : </h6>{" "}
                  {addressDet.residential_address}
                  <h6> Employement Address : </h6>{" "}
                  {addressDet.employement_address}
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="card mt-3">
                <div className="card-header">Miscellaneous Details</div>
                <div className="card-body">
                  <h6> Gap Details (if any) : </h6>
                  {miscellaneousObj.gap_details}
                  <h6> Additional Info (if any) :</h6>
                  {miscellaneousObj.additional_info}
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="card mt-3">
                <div className="card-header">File Viewer</div>
                <div className="card-body">
                  <div>
                    <object
                      data={pdfUrl}
                      // type="application/pdf"
                      width="500"
                      height="500"
                    >
                      {/* <iframe
                        // src={pdfFileURL}
                        width="500"
                        height="500"
                        // title="PDF"
                      >
                        <p>This browser does not support PDF!</p>
                      </iframe> */}
                    </object>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManagerViewEmp;
