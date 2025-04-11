import { useEffect, useState } from 'react';
import { fetchPokemonList } from '../api/pokemonApi';
import { PokemonListResponse } from '../types/pokemonTypes';
import PokemonCard from '../components/PokemonCard';
import './HomePage.css';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

function HomePage() {
  const [pokemonList, setPokemonList] = useState<PokemonListResponse | null>(
    null
  );
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    fetchPokemonList().then((value) => {
      setPokemonList(value);
    });
  }, []);

  return (
    <>
      <div>
        <Header input={searchInput} setInput={setSearchInput} />
      </div>
      <div className="pokemon-list">
        {pokemonList?.results
          .filter((pokemon) => pokemon.name.includes(searchInput.toLowerCase()))
          .map((singlePokemon) => (
            <Link
              key={singlePokemon.name}
              to={`/pokemon/${singlePokemon.name}`}
            >
              <PokemonCard name={singlePokemon.name} url={singlePokemon.url} />
            </Link>
          ))}
      </div>
    </>
  );
}

export default HomePage;
