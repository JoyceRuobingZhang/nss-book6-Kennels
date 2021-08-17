import React, {useEffect, useContext } from 'react'
import {Link} from 'react-router-dom'
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
                                <Link key={location.id} to={`/locations/detail/${location.id}`}>
                                    Location Name: {location.name}
                                </Link>
                            </div>
                            <div>
                                Location Address: {location.address}
                            </div>
                            <div>
                                {location.employees.length} employees
                            </div>
                            <div>
                                {location.animals.length} animals
                            </div>
                        </div>
                    )
                })
                
            }
        </section>
    )
}