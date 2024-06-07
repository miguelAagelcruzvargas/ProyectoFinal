// Importaciones necesarias de React y librerías
import React, { useState } from 'react';
import Swal from 'sweetalert2'; // Librería para mostrar alertas bonitas
import 'bootstrap/dist/css/bootstrap.min.css'; // Importación de estilos de Bootstrap
import './styles/App.css'; // Importación de estilos personalizados
import { useForm } from '../hooks/useForm'; // Hook personalizado para manejar formularios
import { useFavorites } from '../hooks/useFavorites'; // Hook personalizado para manejar favoritos
import { useCharacterSearch } from '../hooks/useCharacterSearch'; // Hook personalizado para manejar búsqueda de personajes
import FavoriteCharacters from './components/FavoriteCharacters'; // Componente para mostrar personajes favoritos
import CharacterModal from './components/CharacterModal'; // Componente modal para mostrar detalles del personaje
import MemoryGame from './components/MemoryGame'; // Componente del juego de memoria
import SearchBar from './components/SearchBar'; // Importación del nuevo componente de búsqueda
import CharacterCard from './components/CharacterCard'; // Importación del nuevo componente de tarjeta de personaje

function App() {
  // Definición del estado
  const { characters, query, setQuery } = useCharacterSearch(); // Usar el hook personalizado para manejar la búsqueda de personajes
  const { favorites, addFavorite, removeFavorite } = useFavorites(); // Usar el hook personalizado para manejar los favoritos
  const [selectedCharacter, setSelectedCharacter] = useState(null); // Estado para almacenar el personaje seleccionado para el modal
  const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal
  const [isMemoryGameActive, setIsMemoryGameActive] = useState(false); // Estado para controlar si el juego de memoria está activo

  // Función para mostrar los detalles de un personaje en un modal
  const handleShowDetails = (character) => {
    setSelectedCharacter(character);
    setShowModal(true);
  };

  // Función para iniciar el juego de memoria
  const handleStartMemoryGame = () => {
    setIsMemoryGameActive(true);
  };

  // Renderización del componente principal
  return (
    <div className="container">
      <h1 className="text-center my-4 gradient-text">RICK AND MORTY</h1>
      <hr />
      {isMemoryGameActive ? (
        <MemoryGame characters={favorites.slice(0, 5)} onExit={() => setIsMemoryGameActive(false)} />
      ) : (
        <>
          <SearchBar searchValue={query} onChange={(e) => setQuery(e.target.value)} onSearch={() => debouncedSearch(query)} />
          <div className="row">
            {characters.map(character => (
              <CharacterCard key={character.id} character={character} onFavorite={addFavorite} />
            ))}
          </div>
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
