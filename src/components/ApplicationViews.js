/* This will define:
 all of the URLs your application will support,
 and which views will be displayed for each one.   */

// You will define how your application will respond when the URL matches each of those patterns. 
// When a user clicks on one of the hyperlinks in the navigation bar, this code dictates which component should be rendered.

import React from "react"
import { Route } from "react-router-dom"

import { LocationProvider } from "./location/LocationProvider"
import { LocationList } from "./location/LocationList"
import { LocationDetail } from "./location/LocationDetail"

import { AnimalProvider } from "./animal/AnimalProvider"
import { AnimalList } from "./animal/AnimalList"
import { AnimalForm } from "./animal/AnimalForm"
import { AnimalDetail } from "./animal/AnimalDetail"
import { AnimalSearch } from "./animal/AnimalSearch"

import { CustomerProvider } from "./customer/CustomerProvider"
import { CustomerList } from "./customer/CustomerList"

import { EmployeeProvider } from "./employee/EmployeeProvider"
import { EmployeeList } from "./employee/EmployeeList"
import { EmployeeForm } from "./employee/EmployeeForm"

// !exact! is needed on the first route, otherwise it will also match the other routes, and the Home will render for every route.
// The <Link/> and the <Route/> JSX elements are complementary to each other. 
// If you add a new Link element in your application with a new URL, then you must create a matching Route element.

export const ApplicationViews = () => {
    return (
        <>
           <h2>Nashville Kennels</h2>
           <small>Loving care when you're not there.</small>

            {/* Render the location list when http://localhost:3000/ */}
            <LocationProvider>
                <Route exact path="/">
                    <LocationList />
                </Route>
            </LocationProvider>

            <LocationProvider>
                <Route exact path="/locations">
                    <LocationList />
                </Route>

                <EmployeeProvider>
                    <AnimalProvider>
                        <Route path="/locations/detail/:locationId(\d+)">
                            <LocationDetail />
                        </Route>
                    </AnimalProvider>
                </EmployeeProvider>
            </LocationProvider>

            {/* Render the animal list when http://localhost:3000/animals */}
            <AnimalProvider>
                <Route exact path="/animals"> 
                {/* using exact above: 
                when the form component below is rendered (path="/animals/create is rendered), 
                the AnimalList component will disappear */}
                    <AnimalSearch /> 
                    <AnimalList />
                </Route>

                <CustomerProvider>
                    <LocationProvider>
                        {/* 
                        : is for dynamite path.
                        (\d+) is a pattern match: 
                            match at least one digit; only a digit will trigger this route */}
                        <Route exact path="/animals/detail/:animalId(\d+)">
                            <AnimalDetail />
                        </Route>
                    </LocationProvider>
                </CustomerProvider>

                <CustomerProvider>
                    <LocationProvider>
                        <Route exact path="/animals/create">
                            <AnimalForm />
                        </Route>
                    </LocationProvider>
                </CustomerProvider>

                <CustomerProvider>
                    <LocationProvider>
                        <Route path="/animals/edit/:animalId(\d+)">
                            <AnimalForm />
                        </Route>
                    </LocationProvider>
                </CustomerProvider>

            </AnimalProvider>


            <EmployeeProvider>
                <Route path="/employees">
                    <EmployeeList />
                </Route>

                <LocationProvider>
                    <Route path="/employees/create">
                        <EmployeeForm />
                    </Route>
                </LocationProvider>
            </EmployeeProvider>

            <CustomerProvider>
                <Route path="/customers">
                    <CustomerList />
                </Route>
            </CustomerProvider>

            
        </>
    )
}
