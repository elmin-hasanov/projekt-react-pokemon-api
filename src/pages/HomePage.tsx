import { useEffect, useState } from "react";
import { fetchPokemonList } from "../api/pokemonApi";
import { PokemonListResponse } from "../types/pokemonTypes";

function HomePage() {

    const [pokemonList, setPokemonList] = useState<PokemonListResponse | null>(null) 

    useEffect(()=>{
        fetchPokemonList().then((value)=>{
            setPokemonList(value)
        })
    },[])
console.log(pokemonList?.results)

  return (
    {pokemonList.map((singlePokemon)=>{
        <h1>{singlePokemon.name}</h1>
    })
    }
  );
}

export default HomePage;
