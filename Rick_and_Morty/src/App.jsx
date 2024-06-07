import React, { useState } from 'react';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';
import './styles/FilterBar.css'; // Importa el nuevo archivo CSS
import { useFavorites } from '../hooks/useFavorites';
import { useCharacterSearch } from '../hooks/useCharacterSearch';
import FavoriteCharacters from './components/FavoriteCharacters';
import CharacterModal from './components/CharacterModal';
import MemoryGame from './components/MemoryGame';
import SearchBar from './components/SearchBar';
import CharacterCard from './components/CharacterCard';
import FilterBar from './components/FilterBar'; // Importa el nuevo componente FilterBar
import Pagination from './components/Pagination'; // Importa el nuevo componente Pagination

function App() {
  const {
    characters,
    query,
    setQuery,
    statusFilter,
    setStatusFilter,
    speciesFilter,
    setSpeciesFilter,
    typeFilter,
    setTypeFilter,
    genderFilter,
    setGenderFilter,
    handleSearch,
    clearResults,
    isLoading,
    page,
    totalPages,
    handlePageChange,
  } = useCharacterSearch();
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isMemoryGameActive, setIsMemoryGameActive] = useState(false);

  const handleShowDetails = (character) => {
    setSelectedCharacter(character);
    setShowModal(true);
  };

  const handleStartMemoryGame = () => {
    setIsMemoryGameActive(true);
  };

  return (
    <div className="container">
      <h1 className="text-center my-4 gradient-text">RICK AND MORTY</h1>
      <hr />
      {isMemoryGameActive ? (
        <MemoryGame characters={favorites.slice(0, 5)} onExit={() => setIsMemoryGameActive(false)} />
      ) : (
        <>
          <SearchBar
            searchValue={query}
            onChange={(e) => setQuery(e.target.value)}
            onSearch={handleSearch}
          />
          <FilterBar
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            speciesFilter={speciesFilter}
            setSpeciesFilter={setSpeciesFilter}
            typeFilter={typeFilter}
            setTypeFilter={setTypeFilter}
            genderFilter={genderFilter}
            setGenderFilter={setGenderFilter}
            handleApplyFilters={handleSearch}
            handleClearResults={clearResults}
          />
          {isLoading ? <div>Loading...</div> : null}
          <div className="row">
            {characters.map((character) => (
              <CharacterCard key={character.id} character={character} onFavorite={addFavorite} />
            ))}
          </div>
          {characters.length > 0 && (
            <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
          )}
          <hr />
          <FavoriteCharacters favorites={favorites} removeFavorite={removeFavorite} onShowDetails={handleShowDetails} />
          {favorites.length >= 5 && (
            <div className="text-center my-4">
              <button className="btn btn-info" onClick={handleStartMemoryGame}>Start Memory Game</button>
            </div>
          )}
          <CharacterModal show={showModal} onHide={() => setShowModal(false)} character={selectedCharacter} />
        </>
      )}
    </div>
  );
}

export default App;
