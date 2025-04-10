import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPokemonDetails } from '../api/pokemonApi';
import { PokemonDetails } from '../types/pokemonTypes';
import Header from '../components/Header';
import TypeFilter from '../components/TypeFilter';
import { useTheme } from '../context/ThemeContext';
import '../styles/PokemonDetails.css';

function DetailPage() {
  const { name } = useParams<{ name: string }>();
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showTypeFilter, setShowTypeFilter] = useState(false);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    if (name) {
      fetchPokemonDetails(name).then((data) => {
        setPokemon(data);
      });
    }
  }, [name]);

  const handleTypeSearch = (types: string[]) => {
    setShowTypeFilter(false);
    // 类型过滤在详情页不影响内容，仅关闭过滤界面
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
        <div className={`details-container ${isDarkMode ? 'dark' : 'light'}`}>
          {pokemon ? (
            <>
              <h2 className="pokemon-number">
                #{pokemon.id.toString().padStart(3, '0')}
              </h2>
              <h2 className="pokemon-name">
                {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
              </h2>
              {pokemon.sprites.other?.['official-artwork']?.front_default ? (
                <img
                  className="pokemon-image"
                  src={pokemon.sprites.other['official-artwork'].front_default}
                  alt={pokemon.name}
                />
              ) : (
                <div className="image-placeholder">No Image</div>
              )}
              <div className="type-container">
                {pokemon.types.map((typeInfo) => (
                  <button
                    key={typeInfo.type.name}
                    className={`type-button ${typeInfo.type.name}`}
                  >
                    {typeInfo.type.name.toUpperCase()}
                  </button>
                ))}
              </div>
              <div className="physical-stats">
                <p>Height: {(pokemon.height / 10).toFixed(1)} m</p>
                <p>Weight: {(pokemon.weight / 10).toFixed(1)} kg</p>
              </div>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      )}
    </div>
  );
}

export default DetailPage;