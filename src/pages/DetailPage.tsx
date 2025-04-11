import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPokemonDetails } from '../api/pokemonApi';
import { PokemonDetails } from '../types/pokemonTypes';
import Header from '../components/Header';
import './DetailPage.css';

function DetailPage() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    if (name) {
      fetchPokemonDetails(name).then((data) => setPokemon(data));
    }
  }, [name]);

  if (!pokemon) return <div>Loading...</div>;

  return (
    <>
      <div>
        <Header input={searchInput} setInput={setSearchInput} />
      </div>
      <div className="detail-page">
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        <h1></h1>

        <div className="pokemon-name">
          <p>#{String(pokemon.id).padStart(3, '0')}</p>
          <p>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</p>
        </div>
      </div>
    </>
  );
}

export default DetailPage;
