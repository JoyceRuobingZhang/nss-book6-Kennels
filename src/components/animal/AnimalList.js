import React, { useContext, useEffect, useState } from "react"
import { Link, useHistory } from 'react-router-dom'
import { AnimalContext } from "./AnimalProvider"
import { AnimalDetail } from "./AnimalDetail"
import "./Animal.css"

export const AnimalList = () => {
  // This state changes when `getAnimals()` is invoked below
  const { animals, getAnimals, searchTerms } = useContext(AnimalContext)

  // Since you are no longer ALWAYS displaying all of the animals
  const [ filteredAnimals, setFiltered ] = useState([])

  // history allows you to immediately use a push() method which you can use to ❗️change the URL. 
  const history = useHistory()

  //useEffect - reach out to the world for something(data)
  /*    The useEffect() hook allows the component to reach out into the world for anything that cannot be handled 
      during render.  In this case, it is the API call for the animals. 
        only do the API call once when this component is rendered. (this component will be rendered many times, but we 
      don't want to do many API calls. 
  */
  useEffect(() => {getAnimals()}, [])
  /*❗️❗️❗️watch the second parameter in useEffect(), if it changes, the fist parameter function should run again.) 
    since we're watching an empty array (watch nothing) here, so it will only run once.   */
  /* you don't have to put the useEffect in this specific component. But it makes more sense to do it here since
     it won't make many fetch calls until it reaches this component. */

  useEffect(() => {
    if (searchTerms !== "") {
      // If the search field is not blank, display matching animals
      const subset = animals.filter(animal => animal.name.toLowerCase().includes(searchTerms))
      setFiltered(subset)
    } else {
      // If the search field is blank, display all animals
      setFiltered(animals)
    }
  }, [searchTerms, animals])

  return (
    <>
      <h1>Animals</h1>

      <button onClick={() => history.push("/animals/create")}>
          Make Reservation
      </button>
      <div className="animals">
      {
        filteredAnimals.map(animal => {
          return <AnimalDetail key={animal.id} animal={animal} />
        })
      }
      </div>
    </>
  )
}


//   ⭐️⭐️ return links for each animal. Links lead to animal details.
//   return (
//     <>
//       <h2>Animals</h2>

//       <button onClick={() => history.push("/animals/create")}>
//             Add Animal
//       </button>

//       <div className="animals">
//       {
//         animals.map(animal => {
//           return (
//             <div className="animal" key={animal.id}>
//               <Link to={`/animals/detail/${animal.id}`} key={animal.id}>{ animal.name }</Link>
//             </div>
//           )
//         })
//       }
//       </div>
//     </>
//   )
// }

{/* key attribute helps React track the state of every item*/}
