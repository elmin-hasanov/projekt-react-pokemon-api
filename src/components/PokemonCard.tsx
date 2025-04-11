import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchPokemonDetails } from '../api/pokemonApi';
import { PokemonDetails } from '../types/pokemonTypes';
import { useTheme } from '../context/ThemeContext';
import '../styles/App.css';

interface PokemonCardProps {
  name: string;
  url: string;
}

const PokemonCard = ({ name, url }: PokemonCardProps) => {
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    fetchPokemonDetails(name).then((data) => {
      setPokemon(data);
    });
  }, [name]);

  return (
    <Link to={`/pokemon/${name}`}>
      <div className={`pokemon-card ${isDarkMode ? 'dark' : 'light'}`}>
        {pokemon?.sprites.other?.['official-artwork']?.front_default ? (
          <img
            src={pokemon.sprites.other['official-artwork'].front_default}
            alt={name}
            className="pokemon-list-image"
          />
        ) : (
          <div className="image-placeholder">No Image</div>
        )}
        <p className="number">#{pokemon?.id.toString().padStart(3, '0')}</p>
        <p className="name">{name.charAt(0).toUpperCase() + name.slice(1)}</p>
      </div>
    </Link>
  );
};

export default PokemonCard;
