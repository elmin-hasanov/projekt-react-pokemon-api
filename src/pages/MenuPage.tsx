import PokemonLogo from '../assets/img/logo.png';
import CloseImg from '../assets/img/close.svg';
import { Link } from 'react-router-dom';
import { fetchPokemonTypes } from '../api/pokemonApi';
import { useEffect, useState } from 'react';
import { PokemonType } from '../types/pokemonTypes';

function MenuPage() {
  const [pokemonTypes, setPokemonTypes] = useState<PokemonType[]>([]);
  const [value, clickedValue] = useState('');

  useEffect(() => {
    fetchPokemonTypes().then((value) => {
      setPokemonTypes(value.results);
    });
  }, []);

  return (
    <article className="menu">
      <div>
        <img className="menu-logo" src={PokemonLogo} alt="Pokemon Logo" />
        <Link to="/">
          <img src={CloseImg} alt="Close Icon" />
        </Link>
      </div>
      <h2>Type</h2>
      <div className="type-btn-list">
        {pokemonTypes.map((singleType) => (
          <button
            key={singleType.name}
            onClick={() => clickedValue(singleType.name)}
          >
            {singleType.name}
          </button>
        ))}
        <p>Ich bin die ausgewählte Value:{value}</p>
      </div>
      <button>SEARCH</button>
    </article>
  );
}

export default MenuPage;
