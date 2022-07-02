import React, { useState, useEffect } from "react";
import DatePicker from "react-date-picker";

function BasicDetails() {
  const [value, setValue] = useState(new Date());
  const [maritalStatus, setmaritalStatus] = useState(false);

  const [basicDetailsObj, setbasicDetailsObj] = useState({
    emp_id: "",
    full_name: "",
    father_husband_name: "",
    email: "",
    phone_no: "",
    date_of_birth: "",
    marital_status: "",
  });

  const handleChange = (e) => {
    const temp = basicDetailsObj;
    temp[e.target.name] = e.target.value;
    setbasicDetailsObj({ ...temp });
  };
  const getFromLocalStorage = () => {
    basicDetailsObj.emp_id = localStorage.getItem("emp_id");
    basicDetailsObj.email = localStorage.getItem("email");
  };
  useEffect(() => {
    getFromLocalStorage();
    getEmpBasicDet();
  }, []);

  const getEmpBasicDet = () => {
    return fetch(
      `http://localhost:4000/api/basicDetails/getbasicdetails/${basicDetailsObj.emp_id}`,
      {
        method: "GET",
      }
    )
      .then((response) => {
        response.json().then((data) => {
          setbasicDetailsObj({
            emp_id: data.user.emp_id,
            full_name: data.user.full_name,
            father_husband_name: data.user.father_husband_name,
            email: data.user.email,
            phone_no: data.user.contact_no,
            date_of_birth: data.user.date_of_birth,
            marital_status: data.user.marital_status,
          });
          setValue(new Date(data.user.date_of_birth));
          setmaritalStatus(
            data.user.marital_status === "unmarried" ? false : true
          );
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    basicDetailsObj.date_of_birth = value;
    //basicDetailsObj.date_of_birth=value.toDateString().split('T')[0]
    maritalStatus === true
      ? (basicDetailsObj.marital_status = "married")
      : (basicDetailsObj.marital_status = "unmarried");
    return fetch(`http://localhost:4000/api/basicDetails/addbasicdetails`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(basicDetailsObj),
    })
      .then((response) => {
        getFromLocalStorage();
        getEmpBasicDet();
        response.json().then((data) => {
          alert(data.message);
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="body container-fluid ">
      <div className="card ">
        <div className="card-header fw-bold text-center">Basic Details</div>

        <div className="card-body">
          <div className="row">
            <form className="pt-1" onSubmit={onSubmit}>
              <div className="mb-2">
                <label className="form-label">
                  Full Name (As per PAN/Adhaar Card):
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="full_name"
                  onChange={handleChange}
                  value={basicDetailsObj.full_name}
                ></input>
              </div>
              <div className="mb-2">
                <label className="form-label">
                  Father/Husband's Name (As per PAN/Adhaar Card):
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="father_husband_name"
                  onChange={handleChange}
                  value={basicDetailsObj.father_husband_name}
                ></input>
              </div>
              <div className="mb-2">
                <label className="form-label"> Personal Email:</label>
                <input
                  type="email"
                  className="form-control"
                  value={basicDetailsObj.email}
                  readOnly
                ></input>
              </div>
              <div className="mb-2">
                <label className="form-label"> Contact Number:</label>
                <input
                  type="number"
                  className="form-control"
                  name="phone_no"
                  onChange={handleChange}
                  value={basicDetailsObj.phone_no}
                ></input>
              </div>
              <div className="mb-2">
                <label className="form-label"> Date Of Birth:</label>
                {console.log(new Date(value))}
                <DatePicker onChange={setValue} value={value} />
              </div>
              <div className="mb-2">
                <label className="form-label"> Marital Status:</label>

                <div>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="marital_status"
                    checked={!maritalStatus}
                    value="unmarried"
                    onChange={(e) =>
                      setmaritalStatus(
                        e.target.value === "unmarried" ? false : true
                      )
                    }
                  ></input>
                  <label className="form-label ">Unmarried</label>
                </div>
                <div>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="marital_status"
                    value="married"
                    checked={maritalStatus}
                    onChange={(e) =>
                      setmaritalStatus(
                        e.target.value === "unmarried" ? false : true
                      )
                    }
                  ></input>
                  <label className="form-label ">Married</label>
                </div>
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

export default BasicDetails;
