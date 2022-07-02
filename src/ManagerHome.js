import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function ManagerHome() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("emp_id");
    localStorage.removeItem("role");
    navigate("/");
  };
  const employee_id = "sample";
  const [usersArray, setUsersArray] = useState([]);

  useEffect(() => {
    getAllEmployees();
  }, []);

  const getAllEmployees = () => {
    return fetch(`http://localhost:4000/api/manager/getAllUsers/`, {
      method: "GET",
    })
      .then((response) => {
        response.json().then((data) => {
          console.log(data.user);
          let temp = data.user;
          setUsersArray(temp);
          console.log(usersArray);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const approve = (emp_id) => {
    return fetch(`http://localhost:4000/api/manager/approveuser/${emp_id}`, {
      method: "PUT",
    })
      .then((response) => {
        console.log(response);
        getAllEmployees();
      })
      .catch((err) => console.log(err));
  };

  const reject = (emp_id) => {
    return fetch(`http://localhost:4000/api/manager/rejectuser/${emp_id}`, {
      method: "PUT",
    })
      .then((response) => {
        console.log(response);
        getAllEmployees();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container-fluid">
      <div className="navbar bg-primary">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1 text-white">
            Employee Background Verification Approval & Rejection
          </span>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <button type="button" className="btn btn-info" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      </div>
      <div className="card mt-3">
        <div className="card-header">Employee's List</div>
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Role</th>
                <th scope="col">View</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {usersArray.map((user, index) => (
                <tr key={user.emp_id}>
                  <td scope="row">{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button type="button" className="btn btn-light">
                      <Link
                        to={{
                          pathname: `/managerview/${user.emp_id}`,
                        }}
                      >
                        {" "}
                        View Details
                      </Link>
                    </button>
                  </td>

                  <td>
                    <button
                      type="button"
                      className="btn btn-success m-1"
                      onClick={() => approve(user.emp_id)}
                    >
                      Approve
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => reject(user.emp_id)}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ManagerHome;
