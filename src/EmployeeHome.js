import React ,{useState} from 'react'
import AddressDetails from './AddressDetails'
import BasicDetails from './BasicDetails'
import EducationalDetails from './EducationalDetails'
import EmployementDetails from './EmployementDetails'
import Miscellaneous from './Miscellaneous'
import { useNavigate } from 'react-router-dom'

function EmployeeHome() {
const navigate=useNavigate()
  const logout =()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    localStorage.removeItem('emp_id')
    localStorage.removeItem('role')
    navigate('/')
  }
  const [component, setComponent] = useState("BasicDetails")

const handleComp=(component)=>{
  switch (component) {
    case "BasicDetails":
        setComponent('BasicDetails')
        break
    case "EmployementDetails":
        setComponent('EmployementDetails')
        break
    case "AddressDetails":
       setComponent('AddressDetails')
       break
    case "EducationalDetails":
        setComponent('EducationalDetails')
        break
    case "Miscellaneous":
        setComponent('Miscellaneous')
        

}


}

  return (
      <div>
    <div className="navbar bg-primary">
  <div className="container-fluid">
    <span className="navbar-brand mb-0 h1 text-white">EBGC</span>
    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
  <button type="button" className="btn btn-info" onClick={logout}>Logout</button>

</div>
  </div>

</div>
<div className="navbar bg-light">
  <div className="container-fluid">
    <span className="navbar-brand mb-0 h1 text-dark">CANDIDATE INFORMATION FORM</span>
  </div>
</div>

<div className="container">
  <div className="row m-3">
    
    <div className="d-grid gap-5 mx-auto col-3">
  
  
  <button type="button" onClick={() => handleComp("BasicDetails")} className="btn btn-outline-secondary">1. BASIC DETAILS</button>
  <button type="button" onClick={() => handleComp("EmployementDetails")} className="btn btn-outline-secondary">2. EMPLOYEMENT DETAILS</button>
  <button type="button" onClick={() => handleComp("AddressDetails")} className="btn btn-outline-secondary">3. ADDRESS DETAILS</button>
  <button type="button" onClick={() => handleComp("EducationalDetails")} className="btn btn-outline-secondary">4. EDUCATIONAL DETAILS</button>
  <button type="button" onClick={() => handleComp("Miscellaneous")} className="btn btn-outline-secondary">5. MISCELLANEOUS</button>

</div>
    <div className="col-9">
      
         {component === 'BasicDetails' && <BasicDetails/>}
         {component === 'EmployementDetails' && <EmployementDetails/>}
         {component === 'AddressDetails' && <AddressDetails/>}
         {component === 'EducationalDetails' && <EducationalDetails/>}
         {component === 'Miscellaneous' && <Miscellaneous/>}

    </div>
  
  </div>
</div>




</div>
  )
}

export default EmployeeHome