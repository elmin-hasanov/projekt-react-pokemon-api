import React, { useEffect, useState } from 'react';
import { fetchPokemonList, fetchPokemonDetails } from '../api/pokemonApi';
import { PokemonListResponse, PokemonDetails } from '../types/pokemonTypes';
import Header from '../components/Header';
import PokemonCard from '../components/PokemonCard';
import TypeFilter from '../components/TypeFilter';
import '../styles/App.css';

function HomePage() {
  const [pokemonList, setPokemonList] = useState<PokemonListResponse | null>(
    null
  );
  const [filteredPokemon, setFilteredPokemon] =
    useState<PokemonListResponse | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [showTypeFilter, setShowTypeFilter] = useState(false);

  useEffect(() => {
    fetchPokemonList().then((value) => {
      setPokemonList(value);
      setFilteredPokemon(value);
    });
  }, []);

  useEffect(() => {
    if (!pokemonList) return;

    const filterPokemon = async () => {
      let results = pokemonList.results;

      if (searchTerm) {
        results = results.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (selectedTypes.length > 0) {
        const filtered = await Promise.all(
          results.map(async (pokemon) => {
            const details = await fetchPokemonDetails(pokemon.name);
            const pokemonTypes = details.types.map((t) => t.type.name);
            return selectedTypes.every((type) => pokemonTypes.includes(type))
              ? pokemon
              : null;
          })
        );
        results = filtered.filter(
          (p): p is { name: string; url: string } => p !== null
        );
      }

      setFilteredPokemon({ results });
    };

    filterPokemon();
  }, [searchTerm, selectedTypes, pokemonList]);

  const handleTypeSearch = (types: string[]) => {
    setSelectedTypes(types);
    setShowTypeFilter(false);
  };

  return (
    <div className="app-container">
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setShowTypeFilter={setShowTypeFilter}
        showTypeFilter={showTypeFilter}
      />
      {showTypeFilter ? (
        <TypeFilter onSearch={handleTypeSearch} />
      ) : (
        <div className="pokemon-list">
          {filteredPokemon?.results.map((singlePokemon) => (
            <PokemonCard
              key={singlePokemon.name}
              name={singlePokemon.name}
              url={singlePokemon.url}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;
