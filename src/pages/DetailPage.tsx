import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPokemonDetails } from '../api/pokemonApi';
import { PokemonDetails } from '../types/pokemonTypes';

function DetailPage() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);

  useEffect(() => {
    if (name) {
      fetchPokemonDetails(name).then((data) => setPokemon(data));
    }
  }, [name]);

  if (!pokemon) return <div>Loading...</div>;

  return (
    <div className="detail-page">
      <h1>{pokemon.name}</h1>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
    </div>
  );
}

export default DetailPage;
