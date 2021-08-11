
import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
export const AnimalContext = createContext()

// This component establishes what data can be used.
export const AnimalProvider = (props) => {

    const [animals, setAnimals] = useState([])
   /* Here's what the State hook is doing for you with a single line of code (line 10): 

    // Define the variable which will hold the data.
        🌕let animals = []

    // Define the function to be used to modify that state.
    const setAnimals = animalsData => {
        🌕if (animalsData !== null && Array.isArray(animalsData)) {
            animals = animalsData
        }
    } */

    const getAnimals = () => {
        return fetch("http://localhost:8000/animals?_expand=customer&_expand=location&_sort=location.id")
        .then(res => res.json())
        .then(setAnimals)
    }

    const addAnimal = animalObj => {
        return fetch("http://localhost:8000/animals", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(animalObj)
        })
        .then(getAnimals)
    }

    /*   You return a context provider which has the `animals` state, `getAnimals` and `addAnimal` function as keys.
         This allows any child elements to access them.
    */
    return (
        <AnimalContext.Provider value={{animals, getAnimals, addAnimal}}>
            {props.children} 
        </AnimalContext.Provider>
    )
}


// 🔥🔥🔥 IMPORTENT NOTES 🔥🔥🔥
// AnimalContext acts like a parent element, providing data & functions to its children.
// children always comes as a property of props.
// props always has children availible.   

// AnimalContext is like a 📖reference book (there is only one ) we named at line 5 using createContex().
// in line 46,  .Provider is a way of accessing AnimalContext.
/*  
   the value object inside the <AnimalContext.Provider> is what you can do with this reference。 
   Without the value, the reference book won't do anything.    
*/
/* 
   everytime you call the 'AnimalProvider' function, you're 🌈creating another bridge🌈 to the AnimalContext(the reference book). 
   比如 line 23-25 in Kennel.js.    
*/



