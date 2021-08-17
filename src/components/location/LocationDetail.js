import React, { useContext, useEffect, useState } from "react"
import { useHistory ,useParams } from "react-router-dom"
import { LocationContext } from "./LocationProvider" 
import "./Location.css"

export const LocationDetail = () => {
    const { locations, getLocations } = useContext(LocationContext)
    const [ location, setLocation ] = useState({ employees: [], animals: [] })


    const { locationId } = useParams()  
    
    useEffect(() => {
        const thisLocation = locations.find(l => l.id === parseInt(locationId)) || { employees: [], animals: [] }
        setLocation(thisLocation)
    }, [locationId, locations])
   

    useEffect(() => {getLocations()}, [])
    

    return (
    <section className="location">
        <h3 className="location__name">{ location.name }</h3>
        <div className="location__employees">
            <h4>Employees:</h4>
            {location.employees.map(employee => {return employee.name})}
        </div>

        <div className="location__animals">
            <h4>Animals:</h4>
            {location.animals.map(animal => {return `${animal.name}, `})}    
        </div>
    </section>
    )
}
