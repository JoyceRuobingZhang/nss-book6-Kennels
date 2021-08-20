import React, { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router"
import { AnimalContext } from "./AnimalProvider" //import is also object destructing
import "./Animal.css"
import { useParams } from "react-router-dom"

export const AnimalDetail = (props) => {
    const { animals, getAnimals, releaseAnimal } = useContext(AnimalContext)
    const [ animal, setAnimal ] = useState({ location: {}, customer: {} })
    
    // In the URL http://localhost:5000/animals/5, 5 is the route parameter. To store the value of 5 in the animalId variable:
    const { animalId } = useParams()  

    // ㊙️㊙️㊙️㊙️㊙️㊙️ connect with the props!!!
    useEffect(() => {
        if(props.animal){
            setAnimal(props.animal)
        }else {
            const thisAnimal = animals.find(a => a.id === parseInt(animalId)) || { location: {}, customer: {} }
        // || { location: {}, customer: {} } is a plan B for line 37. 38. Making sure it won't be null. 
            setAnimal(thisAnimal)
        }
    }, [animalId, animals])
    

    useEffect(() => {getAnimals()}, [])
    // reach out for data 
    // making sure that the http://localhost:3000/animals/detail/# will run without loading AnimalList component.


    const handleRelease = () =>{
        releaseAnimal(animal.id)
        .then(() => {
            history.push("/animals")
        })
    }

    const history = useHistory()

    return (
    <section className="animal">
        <h3 className="animal__name">{ animal.name }</h3>
        <div className="animal__breed">{ animal.breed }</div>
        <div className="animal__location">Location: { animal.location.name }</div>
        <div className="animal__owner">Customer: { animal.customer.name }</div>

        {/* In edit mode, we should have an animalId in the URL. Otherwise, it is a new animal. */}
        <button onClick={() => {history.push(`/animals/edit/${animal.id}`)}}>Edit</button>

        <button onClick={handleRelease}>Release Animal</button>

    </section>
    )
}
