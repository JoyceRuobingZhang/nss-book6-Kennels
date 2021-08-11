import React, { useContext, useEffect, useState } from "react"
import { EmployeeContext } from "./EmployeeProvider";
import { LocationContext } from "../location/LocationProvider"
import { useHistory } from 'react-router-dom';

export const EmployeeForm = () => {
  const { addEmployee } = useContext(EmployeeContext)
  const { locations, getLocations } = useContext(LocationContext)

 // Define the 🌕🌕🌕intial state of the form inputs with useState()
  const [employee, setEmployee] = useState({
    name: "",
    locationId: 0
  });

  const history = useHistory();

  useEffect(() => {getLocations()}, [])

  //when a field changes, update state. The return will re-render and display based on the values in state
  //Controlled component
  const handleControlledInputChange = (event) => {
    /* When changing a state object or array, always create a copy, make changes, and then set state.*/
    const newEmployee = { ...employee }
    
    newEmployee[event.target.id] = event.target.value
    // update state
    /* employee is an object with properties. Set the property to the new value using object bracket notation. 
       即： 
       第一次invoke：🔑newEmployee[name] = employee.name 🔑line 60 
       第二次invoke：🔑newEmployee[locationId] = employee.locationId 🔑line 69 
    */
    setEmployee(newEmployee)
  }

  const handleClickAddEmployee = (event) => {
    event.preventDefault() //Prevents the browser from submitting the form

    const locationId = parseInt(employee.locationId)
    
    if (locationId === 0) {
      window.alert("Please select a location!")
    } else {
      const newEmployee = {
        name: employee.name,
        locationId: locationId
      }
      debugger
      addEmployee(newEmployee)
        .then(() => history.push("/employees"))
    }
  }

  return (
    <form className="employeeForm">
      <h2 className="employeeForm__title">New Employee</h2>

      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Employee name:</label>
          <input type="text" id="name" required autoFocus className="form-control" placeholder="Employee name" 
          value={employee.name} onChange={handleControlledInputChange} />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label htmlFor="location">Assign to location: </label>
          <select name="locationId" id="locationId" className="form-control" 
          value={employee.locationId} onChange={handleControlledInputChange}>
            <option value="0">Select a location</option>
            {locations.map(l => (
              <option key={l.id} value={l.id}>
                {l.name}
              </option>
            ))}
          </select>
        </div>
      </fieldset>

      <button className="btn btn-primary" onClick={handleClickAddEmployee}>
        Add Employee
      </button>
    </form>
  )
}
