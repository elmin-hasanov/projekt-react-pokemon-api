import React, { useState, useEffect } from 'react';
import { fetchPokemonTypes } from '../api/pokemonApi';
import { PokemonType } from '../types/pokemonTypes';
import '../styles/TypeFilter.css';

interface TypeFilterProps {
  onSearch: (selectedTypes: string[]) => void;
}

const TypeFilter = ({ onSearch }: TypeFilterProps) => {
  const [types, setTypes] = useState<PokemonType[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  useEffect(() => {
    fetchPokemonTypes().then((data) => {
      setTypes(data.results);
    });
  }, []);

  const handleTypeClick = (typeName: string) => {
    if (selectedTypes.includes(typeName)) {
      setSelectedTypes(selectedTypes.filter((type) => type !== typeName));
    } else {
      setSelectedTypes([...selectedTypes, typeName]);
    }
  };

  const handleSearch = () => {
    onSearch(selectedTypes);
  };

  return (
    <div className="type-filter">
      <h2 className="type-title">TYPE</h2>
      <div className="type-container">
        {types.map((type) => (
          <button
            key={type.name}
            className={`type-button ${type.name} ${
              selectedTypes.includes(type.name) ? 'active' : ''
            }`}
            onClick={() => handleTypeClick(type.name)}
          >
            {type.name.toUpperCase()}
          </button>
        ))}
      </div>
      <button className="search-button" onClick={handleSearch}>
        SEARCH
      </button>
    </div>
  );
};

export default TypeFilter;
