import React, { useState, useEffect } from 'react';
import { fetchPokemonTypes } from '../api/pokemonApi';
import { PokemonType } from '../types/pokemonTypes';
import '../styles/TypeFilter.css';


export default TypeFilter;