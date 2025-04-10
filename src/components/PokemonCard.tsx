import { useEffect, useState } from "react"
import { PokemonDetails } from "../types/pokemonTypes"
import { fetchPokemonDetails } from "../api/pokemonApi"


type PokemonCardProps = {
    name: string,
    url: string
}




function PokemonCard({name, url}: PokemonCardProps) {

    const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails|null>(null)

    useEffect(()=>{
        fetchPokemonDetails(name).then((value)=>{
            setPokemonDetails(value)
        })
    }, [])
    
    console.log("Details: ", pokemonDetails)
    return (
        <div>
            <img src={pokemonDetails?.sprites.front_default} alt="" />
            <h1>{name}</h1>
            <p>{url}</p>
        </div>
    );
}

export default PokemonCard;
