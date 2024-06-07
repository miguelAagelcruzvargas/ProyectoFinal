import React from "react";
import "../styles/CustomCard.css";

const FavoriteCharacters = ({ favorites, removeFavorite, onShowDetails }) => {
    return (
        <div>
            <h2 className="favorites-title">Your Favorite Characters</h2>
            <div className="favorites-container">
                {favorites.map((character) => (
                    <div
                        key={character.id}
                        className="card-favorite"
                        onClick={() => onShowDetails(character)}
                    >
                        <div className="card-header">{character.name}</div>
                        <img src={character.image} alt={character.name} />
                        <div className="card-body">
                            <p>Status: {character.status}</p>
                            <p>Species: {character.species}</p>
                            <p>Gender: {character.gender}</p>
                            <p>Origin: {character.origin.name}</p>
                            <p>Location: {character.location.name}</p>
                        </div>
                        <div className="card-footer">
                            <button
                                className="btn btn-danger"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeFavorite(character);
                                }}
                            >
                                <img src="./src/assets/borrar.png" alt="Remove" className="icon-remove" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FavoriteCharacters;
