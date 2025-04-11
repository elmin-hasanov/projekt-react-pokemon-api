import { useEffect, useState } from 'react';
import { fetchPokemonList } from '../api/pokemonApi';
import { PokemonListResponse } from '../types/pokemonTypes';
import PokemonCard from '../components/PokemonCard';

import './HomePage.css';
import Header from '../components/Header';
import { Link } from 'react-router-dom';

function HomePage() {
  const [pokemonList, setPokemonList] = useState<PokemonListResponse | null>(
    null
  );

  useEffect(() => {
    fetchPokemonList().then((value) => {
      setPokemonList(value);
    });
  }, []);

  return (
    <div className="pokemon-list">
      {pokemonList?.results.map((singlePokemon) => (
        <Link key={singlePokemon.name} to={`/pokemon/${singlePokemon.name}`}>
          <PokemonCard name={singlePokemon.name} url={singlePokemon.url} />
        </Link>
      ))}
    </div>
  );
}

export default HomePage;
