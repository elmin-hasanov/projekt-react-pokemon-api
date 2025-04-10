import { use, useEffect, useState } from "react";
import { fetchPokemonList } from "../api/pokemonApi";
import { PokemonListResponse } from "../types/pokemonTypes";
import PokemonCard from "../components/PokemonCard";

function HomePage() {
    const [pokemonList, setPokemonList] = useState<PokemonListResponse | null>(
        null
    );

   
    useEffect(() => {
        fetchPokemonList().then((value) => {
            setPokemonList(value);
        });
    }, []);
    // console.log("Liste: ", pokemonList);

   

   

    return (
        <div>
            {pokemonList?.results.map((singlePokemon) => (
                 <PokemonCard key={singlePokemon.name} name={singlePokemon.name} url={singlePokemon.url}/>
            ))
               
            }
        </div>
    );
}
export default HomePage;
