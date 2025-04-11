import React from 'react';
import logo from '../assets/img/logo.png';
import Vector from '../assets/img/Vector.svg';
import ModeIcon from '../assets/img/mode.svg';
import CloseIcon from '../assets/img/close.svg';
import '../styles/Header.css';

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  setShowTypeFilter: (show: boolean) => void;
  showTypeFilter: boolean;
  selectedPokemon: string | null;
  handleBackToHome: () => void;
}

const Header: React.FC<HeaderProps> = ({
  searchTerm,
  setSearchTerm,
  setShowTypeFilter,
  showTypeFilter,
  selectedPokemon,
  handleBackToHome,
}) => {
  const toggleTheme = () => {
    const body = document.body;
    body.classList.toggle('dark-mode');
  };

  return (
    <div className="header-container">
      <header className="header">
        <img src={logo} alt="Pokémon Logo" className="logo" />
        {(showTypeFilter || selectedPokemon) && (
          <button className="back-button" onClick={handleBackToHome}>
            {showTypeFilter ? (
              <img src={CloseIcon} alt="Close" className="close-icon" />
            ) : (
              '◀︎'
            )}
          </button>
        )}
      </header>

      <div className="search-container">
        <button
          className="berger-button"
          onClick={() => setShowTypeFilter(true)}
        >
          <img src={Vector} alt="Menu" className="berger-icon" />
        </button>

        <input
          type="text"
          className="search-bar"
          placeholder="Search Pokémon"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {!(showTypeFilter || selectedPokemon) && (
          <button className="theme-toggle-button" onClick={toggleTheme}>
            <img src={ModeIcon} alt="Toggle Theme" className="mode-icon" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
