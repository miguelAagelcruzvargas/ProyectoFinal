import React from 'react';
import PropTypes from 'prop-types';
import '../styles/SearchBar.css';
import searchIcon from '../assets/libro-de-texto.png'; // Ajusta la ruta según la ubicación de tu imagen

const SearchBar = ({ searchValue, onChange, onSearch }) => (
    <div className="input-group mb-3">
        <input
            type="text"
            className="form-control bg-dark text-light"
            name="search"
            value={searchValue}
            onChange={onChange}
            placeholder="Enter character name"
        />
        <div className="input-group-append">
            <button className="btn btn-gold" onClick={() => onSearch(searchValue)}>
                <img src={searchIcon} alt="Search" className="search-icon" />
            </button>
        </div>
    </div>
);

SearchBar.propTypes = {
    searchValue: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
