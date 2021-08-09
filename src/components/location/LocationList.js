import React, {useEffect, useContext } from 'react'
import { LocationContext } from './LocationProvider'
import "./Location.css"

export const LocationList = () => {
    const {locations, getLocations } = useContext(LocationContext)

    useEffect(() => {getLocations()}, [])

    return (
        <section className="locations">
            {
                locations.map(location => {
                    return (
                        <div className="location" id={`location--${location.id}`} key={location.id}>
                            <div>
                                Location Name: {location.name}
                            </div>
                            <div>
                                Location Address: {location.address}
                            </div>
                        </div>
                    )
                })
                
            }
        </section>
    )
}