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

      <div className="pokemon-card-detail">
        <div className="pokemon-image">
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        </div>

        <div>
          <div className="pokemon-name">
            <p>#{String(pokemon.id).padStart(3, '0')}</p>
            <p>
              {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            </p>
          </div>

          <div className="pokemon-type-list">
            {pokemon.types.map((type) => (
              <p key={type.type.name}>
                {type.type.name.charAt(0).toUpperCase() +
                  type.type.name.slice(1)}
              </p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailPage;
