import React, { useState, useEffect } from "react";

function AddressDetails() {
  const [addressDet, setaddressDet] = useState({
    emp_id: "",
    residential_address: "",
    employement_address: "",
  });

  const handleChange = (e) => {
    const temp = addressDet;
    temp[e.target.name] = e.target.value;
    setaddressDet({ ...temp });
  };
  const getFromLocalStorage = () => {
    addressDet.emp_id = localStorage.getItem("emp_id");
    console.log(addressDet.emp_id);
  };
  useEffect(() => {
    getFromLocalStorage();
    getAddressDet();
  }, []);

  const getAddressDet = () => {
    return fetch(
      `http://localhost:4000/api/address/getaddress/${addressDet.emp_id}`,
      {
        method: "GET",
      }
    )
      .then((response) => {
        response.json().then((data) => {
          setaddressDet({
            emp_id: data.user.emp_id,
            residential_address: data.user.residential_address,
            employement_address: data.user.employement_address,
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    return fetch(`http://localhost:4000/api/address/addaddress`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addressDet),
    })
      .then((response) => {
        getFromLocalStorage();
        getAddressDet();
        response.json().then((data) => {
          alert(data.message);
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="body container-fluid ">
      <div className="card ">
        <div className="card-header fw-bold text-center">Address Details</div>
        <form className="pt-1" onSubmit={onSubmit}>
          <div className="card-body">
            <h5 className="card-subtitle mb-2 text-muted">
              Residential Address For Last 2 Years
            </h5>
            <div className="row ">
              <div className="mb-2">
                <label className="form-label">Residential Address:</label>
                <input
                  type="text"
                  className="form-control"
                  name="residential_address"
                  onChange={handleChange}
                  value={addressDet.residential_address}
                ></input>
              </div>
            </div>
          </div>
          <div className="card-body">
            <h5 className="card-subtitle mb-2 text-muted">
              Employement Address For Last 2 Years
            </h5>
            <div className="row ">
              <div className="mb-2">
                <label className="form-label">Employement Address:</label>
                <input
                  type="text"
                  className="form-control"
                  name="employement_address"
                  onChange={handleChange}
                  value={addressDet.employement_address}
                ></input>
              </div>
            </div>
          </div>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end m-2">
            <button type="submit" className="btn btn-success">
              Save / Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddressDetails;
