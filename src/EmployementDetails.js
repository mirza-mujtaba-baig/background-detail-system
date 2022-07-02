import React, { useState, useEffect } from "react";
import DatePicker from "react-date-picker";

function EmployementDetails() {
  const [value, onChange] = useState(new Date());
  const [value1, onChange1] = useState(new Date());

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

  const handleChange = (e) => {
    const temp = employementDetails;
    temp[e.target.name] = e.target.value;
    setemployementDetails({ ...temp });
  };
  const getFromLocalStorage = () => {
    employementDetails.emp_id = localStorage.getItem("emp_id");
  };
  useEffect(() => {
    getFromLocalStorage();
    getEmployementDet();
  }, []);

  const getEmployementDet = () => {
    return fetch(
      `http://localhost:4000/api/employement/getemployement/${employementDetails.emp_id}`,
      {
        method: "GET",
      }
    )
      .then((response) => {
        response.json().then((data) => {
          console.log(data);
          setemployementDetails({
            emp_id: data.user.emp_id,
            employer_name: data.user.employer_name,
            previous_employee_id: data.user.previous_employee_id,
            employer_phone_no: data.user.employer_ph_no,
            job_title: data.user.job_title,
            gross_ctc: data.user.gross_ctc,
          });
          onChange(new Date(data.user.date_of_joining));
          onChange1(new Date(data.user.date_of_leaving));
          console.log(employementDetails);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    employementDetails.joining_date = value;
    employementDetails.leaving_date = value1;
    console.log(employementDetails);

    return fetch(`http://localhost:4000/api/employement/addemployement`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employementDetails),
    })
      .then((response) => {
        getFromLocalStorage();
        getEmployementDet();
        response.json().then((data) => {
          alert(data.message);
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container-fluid ">
      <div className="card">
        <div className="card-header fw-bold text-center">
          Employement Details
        </div>

        <div className="card-body">
          <h5 className="card-subtitle m-1 text-muted">Previous Employement</h5>
          <div className="row ">
            <form className="pt-1" onSubmit={onSubmit}>
              <div className="mb-2">
                <label className="form-label">Employer Name:</label>
                <input
                  type="text"
                  className="form-control"
                  name="employer_name"
                  onChange={handleChange}
                  value={employementDetails.employer_name}
                ></input>
              </div>
              <div className="mb-2">
                <label className="form-label">Employee ID:</label>
                <input
                  type="text"
                  className="form-control"
                  name="previous_employee_id"
                  onChange={handleChange}
                  value={employementDetails.previous_employee_id}
                ></input>
              </div>
              <div className="mb-2">
                <label className="form-label">
                  Contact Number Of Employer:
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="employer_phone_no"
                  onChange={handleChange}
                  value={employementDetails.employer_phone_no}
                ></input>
              </div>
              <div className="mb-2">
                <label className="form-label">Job Title:</label>
                <input
                  type="text"
                  className="form-control"
                  name="job_title"
                  onChange={handleChange}
                  value={employementDetails.job_title}
                ></input>
              </div>
              <div className="mb-2">
                <label className="form-label p-2"> Date Of Joining:</label>
                <DatePicker onChange={onChange} value={value} />
                <label className="form-label p-2"> Date Of Leaving:</label>
                <DatePicker onChange={onChange1} value={value1} />
              </div>

              <div className="mb-2">
                <label className="form-label">Gross CTC:</label>
                <input
                  type="Number"
                  className="form-control"
                  name="gross_ctc"
                  onChange={handleChange}
                  value={employementDetails.gross_ctc}
                ></input>
              </div>

              <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button type="submit" className="btn btn-success">
                  Save / Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployementDetails;
