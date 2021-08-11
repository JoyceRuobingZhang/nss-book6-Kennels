import React, { useContext, useEffect, useState } from "react"
import { LocationContext } from "../location/LocationProvider"
import { AnimalContext } from "../animal/AnimalProvider"
import { CustomerContext } from "../customer/CustomerProvider"
import "./Animal.css"
import { useHistory } from 'react-router-dom';

export const AnimalForm = () => {
  const { addAnimal } = useContext(AnimalContext)
  const { locations, getLocations } = useContext(LocationContext)
  const { customers, getCustomers } = useContext(CustomerContext)

  /*
  With React, we do not target the DOM with `document.querySelector()`. Instead, our return (render) reacts to state or props.

  Define the 🌕🌕🌕intial state of the form inputs with useState()
  */

  const [animal, setAnimal] = useState({
    name: "",
    breed: "",
    locationId: 0,
    customerId: 0
  });

  const history = useHistory();

  /* Reach out to the world and get customers state and locations state on initialization.*/
  useEffect(() => {getCustomers().then(getLocations)}, [])


  //when a field changes, update state. The return will re-render and display based on the values in state
  //Controlled component
  // handling transient state
  const handleControlledInputChange = (event) => {
    /* When changing a state object or array, always create a copy, make changes, and then set state.*/
    const newAnimal = { ...animal }
    /* Animal is an object with properties. Set the property to the new value using object bracket notation. */
    newAnimal[event.target.id] = event.target.value
    // update state
    setAnimal(newAnimal)
  }

  const handleClickSaveAnimal = (event) => {
    event.preventDefault() //Prevents the browser from submitting the form

    const locationId = parseInt(animal.locationId)
    const customerId = parseInt(animal.customerId)

    if (locationId === 0 || customerId === 0) {
      window.alert("Please select a location and a customer")
    } else {
      //Invoke addAnimal passing the new animal object as an argument
      //Once complete, change the url and display the animal list

      const newAnimal = {
        name: animal.name,
        breed: animal.breed,
        locationId: locationId,
        customerId: customerId
      }
      addAnimal(newAnimal)
        .then(() => history.push("/animals"))
    }
  }

  return (
    <form className="animalForm">
      <h2 className="animalForm__title">New Animal</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Animal name:</label>
          <input type="text" id="name" required autoFocus className="form-control" placeholder="Animal name" 
          value={animal.name} onChange={handleControlledInputChange} />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Animal breed:</label>
          <input type="text" id="breed" required autoFocus className="form-control" placeholder="Animal breed" 
          value={animal.breed} onChange={handleControlledInputChange} />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label htmlFor="location">Assign to location: </label>
          <select name="locationId" id="locationId" className="form-control" 
          value={animal.locationId} onChange={handleControlledInputChange}>
            <option value="0">Select a location</option>
            {locations.map(l => (
              <option key={l.id} value={l.id}>
                {l.name}
              </option>
            ))}
          </select>
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label htmlFor="customerId">Customer: </label>
          <select name="customer" id="customerId" className="form-control" 
          value={animal.customerId} onChange={handleControlledInputChange}>
            <option value="0">Select a customer</option>
            {customers.map(c => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </fieldset>

      <button className="btn btn-primary" onClick={handleClickSaveAnimal}>
        Save Animal
      </button>
    </form>
  )
}
