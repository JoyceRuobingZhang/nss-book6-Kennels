import React, { createContext, useState} from "react"

export const LocationContext = createContext()

export const LocationProvider = (props) => {
    const [locations, setLocations] = useState([])

    const getLocations = () => {
        return fetch("http://localhost:8000/locations")
        .then(res => res.json())
        .then(setLocations)
    }

    const addLocation = (locationObj) => {
        return fetch("http://localhost:8000/locations", {
            method: "POST",
            header: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(locationObj)
        })
        .then(getLocations)
    }

    return (
        <LocationContext.Provider value={{locations, getLocations, addLocation}}>
            {props.children}
        </LocationContext.Provider>
    )
}
