import React, { useState, useEffect } from "react";
import DatePicker from "react-date-picker";

function EducationalDetails() {
  const [value, onChange] = useState(new Date());
  const [value1, onChange1] = useState(new Date());

  const [educationDetails, seteducationDetails] = useState({
    emp_id: "",
    education: "",
    start_date: "",
    end_date: "",
    roll_no: "",
    name_address_college: "",
    name_address_university: "",
  });

  const handleChange = (e) => {
    const temp = educationDetails;
    temp[e.target.name] = e.target.value;
    seteducationDetails({ ...temp });
  };
  const getFromLocalStorage = () => {
    educationDetails.emp_id = localStorage.getItem("emp_id");
  };
  useEffect(() => {
    getFromLocalStorage();
    getEducationDet();
  }, []);

  const getEducationDet = () => {
    return fetch(
      `http://localhost:4000/api/education/geteducation/${educationDetails.emp_id}`,
      {
        method: "GET",
      }
    )
      .then((response) => {
        response.json().then((data) => {
          seteducationDetails({
            emp_id: data.user.emp_id,
            education: data.user.education,
            start_date: data.user.start_date,
            end_date: data.user.end_date,
            roll_no: data.user.roll_no,
            name_address_college: data.user.name_address_college,
            name_address_university: data.user.name_address_university,
          });
          onChange(new Date(data.user.start_date));
          onChange1(new Date(data.user.end_date));
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    educationDetails.start_date = value;
    educationDetails.end_date = value1;
    console.log(educationDetails);

    return fetch(`http://localhost:4000/api/education/addeducation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(educationDetails),
    })
      .then((response) => {
        getFromLocalStorage();
        getEducationDet();
        response.json().then((data) => {
          alert(data.message);
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="body container-fluid ">
      <div className="card">
        <div className="card-header fw-bold  text-center">
          Educational Details
        </div>

        <div className="card-body">
          <div className="row ">
            <form className="pt-2" onSubmit={onSubmit}>
              <div className="mb-2">
                <label className="form-label">Education Obtained:</label>
                <input
                  type="text"
                  className="form-control"
                  name="education"
                  onChange={handleChange}
                  value={educationDetails.education}
                ></input>
              </div>
              <div className="mb-2">
                <label className="form-label p-2">Start Date:</label>
                <DatePicker onChange={onChange} value={value} />
                <label className="form-label p-2">End Date:</label>
                <DatePicker onChange={onChange1} value={value1} />
              </div>
              <div className="mb-2">
                <label className="form-label">Roll Number:</label>
                <input
                  type="text"
                  className="form-control"
                  name="roll_no"
                  onChange={handleChange}
                  value={educationDetails.roll_no}
                ></input>
              </div>
              <div className="mb-2">
                <label className="form-label">
                  Name & Address of School/College/Institute:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="name_address_college"
                  onChange={handleChange}
                  value={educationDetails.name_address_college}
                ></input>
              </div>
              <div className="mb-2">
                <label className="form-label">
                  Name & Address of University its Affiliated:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="name_address_university"
                  onChange={handleChange}
                  value={educationDetails.name_address_university}
                ></input>
              </div>

              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
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

export default EducationalDetails;
