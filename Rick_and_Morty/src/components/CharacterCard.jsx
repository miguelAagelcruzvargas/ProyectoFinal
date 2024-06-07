import React from 'react';
import '../styles/CustomCard.css';

const CharacterCard = ({ character, onFavorite }) => {
    return (
        <div className="card" onClick={() => onFavorite(character)}>
            <img src={character.image} className="card-img-top" alt={character.name} />
            <div className="card-body">
                <h5 className="card-title">{character.name}</h5>
                <p className="card-text">Status: {character.status}</p>
                <p className="card-text">Species: {character.species}</p>
                <p className="card-text">Gender: {character.gender}</p>
                <p className="card-text">Origin: {character.origin.name}</p>
                <p className="card-text">Location: {character.location.name}</p>
            </div>
        </div>
    );
};

export default CharacterCard;
