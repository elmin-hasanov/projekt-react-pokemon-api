import React from 'react';
import { Link } from 'react-router-dom';
import TypeFilter from '../components/TypeFilter';
import PokemonLogo from '../assets/img/logo.png';
import CloseImg from '../assets/img/close.svg';
import '../styles/TypeFilter.css';

function MenuPage() {
  const handleTypeSearch = (types: string[]) => {

    console.log('Selected types:', types);
  };

  return (
    <article className="type-filter">
      <div>
        <img className="menu-logo" src={PokemonLogo} alt="Pokémon Logo" />
        <Link to="/">
          <img src={CloseImg} alt="Close Icon" />
        </Link>
      </div>
      <TypeFilter onSearch={handleTypeSearch} />
    </article>
  );
}

export default MenuPage;