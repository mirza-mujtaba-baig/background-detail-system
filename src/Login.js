import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [userObj, setuserObj] = useState({
    email: "",
    password: "",
  });

  const [message, setmessage] = useState("");

  const handleChange = (event) => {
    const temp = userObj;
    temp[event.target.name] = event.target.value;
    setuserObj({ ...temp });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    return fetch(`http://localhost:4000/api/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObj),
    })
      .then((response) => {
        response.json().then((data) => {
          console.log(data);
          if (data.message !== "Authentication Successfull") {
            alert(data.message);
          }
          setuserObj({
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
          email: "",
          password: "",
        });
        console.log(err);
      });
  };

  // const errorAlert = () => {
  //   <div
  //     className="alert alert-danger mt-2"
  //     style={{ display: message == !"" ? true : false }}
  //   >
  //     <h4>{message} </h4>
  //   </div>;
  // };
  return (
    <div className="card-body">
      <h5 className="card-title pt-3 text-muted">
        Please login with your credentials
      </h5>
      <div className="row col-4 offset-4">
        <form className="pt-2" onSubmit={onSubmit}>
          <div className="mb-3">
            <label className="form-label">Email / User Name</label>
            <input
              type="email"
              className="form-control"
              name="email"
              onChange={handleChange}
              value={userObj.email}
              required
            ></input>
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={handleChange}
              value={userObj.password}
              required
            ></input>
          </div>

          <button type="submit" className="btn btn-primary">
            Login
          </button>
          {/* {errorAlert()} */}
          <p className="pt-5">
            New User ? kindly <Link to="/register">REGISTER </Link>here for
            login
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
