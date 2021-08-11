import React, { useContext, useEffect } from "react"
import { AnimalContext } from "./AnimalProvider"
import { useHistory } from 'react-router-dom'
import "./Animal.css"

export const AnimalList = () => {
  // This state changes when `getAnimals()` is invoked below
  const { animals, getAnimals } = useContext(AnimalContext)

  // history allows you to immediately use a push() method which you can use to ❗️change the URL. 
  const history = useHistory()

  //useEffect - reach out to the world for something
  /*    The useEffect() hook allows the component to reach out into the world for anything that cannot be handled 
      during render.  In this case, it is the API call for the animals. 
        olny do the API call once when this component is rendered. (this component will be rendered many times, but we 
      don't want to do many API calls. ✨the [] means "I want you to only run one time!") 
  */
  useEffect(() => {
    console.log("AnimalList: useEffect - getAnimals")
    getAnimals()
  }, [])
  /* you don't have to put the useEffect in this specific component. But it makes more sense to do it here since
     it won't make many fetch calls untill it reaches this component. */

  return (
    <>
      <h2>Animals</h2>

      <button onClick={() => history.push("/animals/create")}>
            Add Animal
      </button>

      <div className="animals">
      {
        animals.map(animal => {
          return (
            <div className="animal" id={`animal--${animal.id}`}>
              <div className="animal__name">
                Name: { animal.name }
              </div>
              <div className="animal__breed">
                Breed: { animal.breed }
              </div>
              <div className="animal__owner">
                Owner: { animal.customer.name}
              </div>
            </div>
          )
        })
      }
      </div>
    </>
  )
}
