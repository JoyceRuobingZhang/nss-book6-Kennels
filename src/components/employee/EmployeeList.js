import React, {useEffect, useContext} from 'react'
import { EmployeeContext } from './EmployeeProvider'
import "./Employee.css"

export const EmployeeList = () => {

const { employees, getEmployees } = useContext(EmployeeContext)

useEffect(() => {getEmployees()}, [])

// const LocationName

return (
    <section className="employees">
        {
            employees.map( employee => {
                return (
                    <div className="employee" id={`employee--${employee.id}`} key={employee.id}>
                        <div className="employee_name">
                            Employee Name：
                            {employee.name}
                        </div>
                        <div className="employss_location">
                            Employee Location: {employee.location.name}
                        </div>
                    </div>
                )
            })
        }
    </section>

)
}