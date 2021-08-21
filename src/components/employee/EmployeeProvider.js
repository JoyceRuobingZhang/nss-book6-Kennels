import React, {useState,createContext} from 'react'

export const EmployeeContext = createContext()

export const EmployeeProvider = (props) => {
    const [employees, setEmployees] = useState([])

    const getEmployees = () => {
        return fetch("https://nss-kennel-api-joyce.herokuapp.com/employees?_expand=location")
        .then(res => res.json())
        .then(setEmployees)
    }

    const addEmployee = (employeeObj) => {
        debugger
        return fetch("http://localhost:8000/employees", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(employeeObj)
        })
        .then(getEmployees)
    }

    return (
        <EmployeeContext.Provider value={{employees, getEmployees, addEmployee}}>
            {props.children}
        </EmployeeContext.Provider>
    )
}