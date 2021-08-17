import React, { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router"
import { AnimalContext } from "./AnimalProvider" //import is also object destructing
import "./Animal.css"
import { useParams } from "react-router-dom"

export const AnimalDetail = (props) => {
    const { animals, getAnimals, releaseAnimal } = useContext(AnimalContext)
    const [ animal, setAnimal ] = useState({ location: {}, customer: {} })

    /*
    In the following URL, 5 is the route parameter
    http://localhost:5000/animals/5

        Given the example URL above, this will store the value
        of 5 in the animalId variable
    */
    const { animalId } = useParams()  
    // useParams() returns an object: {animalId: 5} (it comes from ApplicationView.js line 63 route.)
    // line 17 can also be: const animalId = useParams().animalId

    useEffect(() => {
        const thisAnimal = animals.find(a => a.id === parseInt(animalId)) || { location: {}, customer: {} }
        // || { location: {}, customer: {} } is a plan B for line 37. 38. Making sure it won't be null. 
        setAnimal(thisAnimal)
    }, [animalId, animals])
    // ❗️❗️❗️watch the second parameter in useEffect(), if it changes, the fist parameter function should run again.
    // before we receive the getAnimals promise, animals is still an empty array.

    useEffect(() => {getAnimals()}, [])
    // reach out for data 
    // making sure that the http://localhost:3000/animals/detail/# will run without loading AnimalList component.

    const history = useHistory()

    const handleRelease = () =>{
        releaseAnimal(animal.id)
        .then(() => {
            history.push("/animals")
        })
    }

    return (
    <section className="animal">
        <h3 className="animal__name">{ props.animal.name }</h3>
        <div className="animal__breed">{ props.animal.breed }</div>
        <div className="animal__location">Location: { props.animal.location.name }</div>
        <div className="animal__owner">Customer: { props.animal.customer.name }</div>

        {/* In edit mode, we should have an animalId in the URL. Otherwise, it is a new animal. */}
        <button onClick={() => {history.push(`/animals/edit/${props.animal.id}`)}}>Edit</button>

        <button onClick={handleRelease}>Release Animal</button>

    </section>
    )
}
