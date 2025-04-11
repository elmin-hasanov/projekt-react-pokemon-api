import Logimg from '../assets/img/logo.png';
import HamburgerMenu from '../assets/img/hamburger.svg';
import HamburgerMenuBack from '../assets/img/back.svg';
import SwitchMode from '../assets/img/switch-mode.svg';

import '../components/Header.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchPokemonDetails } from '../api/pokemonApi';
import { PokemonDetails } from '../types/pokemonTypes';

type HeaderProps = {
  input: string;
  setInput: (input: string) => void;
};

export default function Header({ input }: HeaderProps) {
  const [input, setInput] = useState<PokemonDetails | null>(null);
  // const [name, setName] = useState('');

  useEffect(() => {
    fetchPokemonDetails().then((input) => {
      setInput(input);
    });
  }, []);

  console.log(input);

  return (
    <header>
      <Link to="/">
        <div className="logo">
          <img src={Logimg} alt="" />
        </div>
      </Link>

      <div className="search-bar">
        <Link to="/menu">
          <div className="hamburger">
            <img src={HamburgerMenu} alt="" />
          </div>
        </Link>
        <Link to="/">
          <div className="hamburger-close">
            <img src={HamburgerMenuBack} alt="" />
          </div>
        </Link>

        <div>
          <input onChange={(e) => setInput(e.target.value)} type="text" />
        </div>
        <div>
          <img src={SwitchMode} alt="" />
        </div>
      </div>
    </header>
  );
}
