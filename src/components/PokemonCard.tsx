import { useEffect, useState } from "react";
import { PokemonDetails } from "../types/pokemonTypes";
import { fetchPokemonDetails } from "../api/pokemonApi";


type PokemonCardProps = {
    name: string;
    url: string;
};

function PokemonCard({ name }: PokemonCardProps) {
    const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails | null>(
        null
    );

    useEffect(() => {
        fetchPokemonDetails(name).then((value) => {
            setPokemonDetails(value);
        });
    }, [name]);

    // console.log("Details: ", pokemonDetails)

   


    return (
        <div>
            <img src={pokemonDetails?.sprites.front_default} alt="" />
            <div>
            <p>#{String(pokemonDetails?.id).padStart(3, '0')}</p>
                <p>{name}</p>
            </div>
        </div>
    );
}

export default PokemonCard;
