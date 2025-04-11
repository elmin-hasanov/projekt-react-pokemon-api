import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
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
}

const Header = ({
  searchTerm,
  setSearchTerm,
  setShowTypeFilter,
  showTypeFilter,
}: HeaderProps) => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className={`header-container ${isDarkMode ? 'dark-mode' : ''}`}>
      <header className="header">
        <Link to="/">
          <button className="logo-button">
            <img src={logo} alt="Pokémon Logo" className="logo logo-animated" />
          </button>
        </Link>
        {showTypeFilter && (
          <button
            className="back-button"
            onClick={() => setShowTypeFilter(false)}
          >
            <img src={CloseIcon} alt="Close" className="close-icon" />
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
        {!showTypeFilter && (
          <button className="theme-toggle-button" onClick={toggleTheme}>
            <img src={ModeIcon} alt="Toggle Theme" className="mode-icon" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
