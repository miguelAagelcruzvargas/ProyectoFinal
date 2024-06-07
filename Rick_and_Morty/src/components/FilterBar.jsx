import React from 'react';
import '../styles/FilterBar.css';

const FilterBar = ({
  statusFilter,
  setStatusFilter,
  speciesFilter,
  setSpeciesFilter,
  typeFilter,
  setTypeFilter,
  genderFilter,
  setGenderFilter,
  handleApplyFilters,
  handleClearResults
}) => {
  return (
    <div className="filter-bar">
      <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
        <option value="all">All Statuses</option>
        <option value="alive">Alive</option>
        <option value="dead">Dead</option>
        <option value="unknown">Unknown</option>
      </select>
      <select value={speciesFilter} onChange={(e) => setSpeciesFilter(e.target.value)}>
        <option value="all">All Species</option>
        <option value="human">Human</option>
        <option value="alien">Alien</option>
        {/* Agregar más opciones según lo necesario */}
      </select>
      <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
        <option value="all">All Types</option>
        <option value="type1">Type 1</option>
        <option value="type2">Type 2</option>
        {/* Agregar más opciones según lo necesario */}
      </select>
      <select value={genderFilter} onChange={(e) => setGenderFilter(e.target.value)}>
        <option value="all">All Genders</option>
        <option value="female">Female</option>
        <option value="male">Male</option>
        <option value="genderless">Genderless</option>
        <option value="unknown">Unknown</option>
      </select>
     
      <button onClick={handleClearResults}>Clear Results</button>
    </div>
  );
};

export default FilterBar;
