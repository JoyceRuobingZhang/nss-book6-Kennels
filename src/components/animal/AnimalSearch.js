import React, { useContext } from "react"
import { AnimalContext } from "./AnimalProvider"
import "./Animal.css"


/* 
    A search feature on any site can easily be considered its own component. 
    The component's sole responsibility is to capture the text from the user:
    🔥As the user types, you must immediately 🔥update the searchTerms state variable in the parent component.
*/ 
export const AnimalSearch = () => {
  const { setSearchTerms } = useContext(AnimalContext)

  return (
    <>
      Animal search:
      <input type="text"
        className="input--wide"
        onKeyUp={(event) => setSearchTerms(event.target.value)}
        placeholder="Search for an animal... " />
    </>
  )
}
