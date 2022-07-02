import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [userObj, setuserObj] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const temp = userObj;
    temp[event.target.name] = event.target.value;
    setuserObj({ ...temp });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    return fetch(`http://localhost:4000/api/user/adduser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObj),
    })
      .then((response) => {
        response.json().then((data) => {
          console.log(data);
          if (data.message !== "Successfully Registered") {
            alert(data.message);
          }
          setuserObj({
            name: "",
            email: "",
            password: "",
          });
          localStorage.setItem("token", data.token);
          localStorage.setItem("email", data.user.email);
          localStorage.setItem("emp_id", data.user.emp_id);
          localStorage.setItem("role", data.user.role);
          if (data.token) {
            if (data.user.role === "employee") {
              navigate("/employeehome");
            } else {
              navigate("/managerhome");
            }
          }
        });
      })
      .catch((err) => {
        setuserObj({
          name: "",
          email: "",
          password: "",
        });
        console.log(err);
      });
  };

  return (
    <div className="body container-fluid text-center">
      <div className="card text-center mt-4 ">
        <div className="card-header fw-bold">
          Employee Background Verification System Management
        </div>

        <div className="card-body">
          <h5 className="card-title pt-3 text-muted">
            Please Register here for login
          </h5>
          <div className="row col-4 offset-4">
            <form className="pt-2" onSubmit={onSubmit}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  onChange={handleChange}
                  name="name"
                  value={userObj.name}
                ></input>
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  required
                  onChange={handleChange}
                  name="email"
                  value={userObj.email}
                ></input>
              </div>
              {/* <div className="mb-3">
    <label  className="form-label">Role</label>
    <input type="text" className="form-control" ></input>
  </div> */}
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  required
                  onChange={handleChange}
                  name="password"
                  value={userObj.password}
                ></input>
              </div>

              <button type="submit" className="btn btn-primary">
                Register
              </button>
              <p className="pt-5">
                Registered ? Go to <Link to="/">Login </Link> Page
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
