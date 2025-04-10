import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { fetchPokemonDetails } from '../api/pokemonApi';
import { PokemonDetails as PokemonDetailsType } from '../types/pokemonTypes';
import Header from './Header';
import '../styles/PokemonDetails.css';


export default PokemonDetails;