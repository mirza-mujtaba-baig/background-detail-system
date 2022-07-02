import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import EmployeeHome from "./EmployeeHome";
import Login from "./Login";
import ManagerHome from "./ManagerHome";
import ManagerViewEmp from "./ManagerViewEmp";
import Register from "./Register";

function Rout() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/employeehome" element={<EmployeeHome />}></Route>
        <Route path="/managerhome" element={<ManagerHome />}></Route>
        <Route
          path="/managerview/:employee_id"
          element={<ManagerViewEmp />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Rout;
