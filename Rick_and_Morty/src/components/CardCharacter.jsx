import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import { getEpisodes } from '../api/RickAndMortyApi';
import './App.css'; // o el archivo donde se encuentren las reglas CSS

const CardCharacter = ({ character, removeFavorite }) => {
    const [episodes, setEpisodes] = useState([]);

    useEffect(() => {
        const fetchEpisodes = async () => {
            const episodeData = await getEpisodes(character.episode);
            setEpisodes(episodeData);
        };

        fetchEpisodes();
    }, [character.episode]);

    const showDetails = () => {
        Swal.fire({
            title: character.name,
            html: `
        <div style="text-align: left;">
          <p><b>Status:</b> ${character.status}</p>
          <p><b>Species:</b> ${character.species}</p>
          <p><b>Gender:</b> ${character.gender}</p>
          <p><b>Origin:</b> ${character.origin.name}</p>
          <p><b>Location:</b> ${character.location.name}</p>
          <p><b>Episodes:</b></p>
          <ul style="padding-left: 20px;">
            ${episodes.map(episode => `<li>${episode.episode} - ${episode.name}</li>`).join('')}
          </ul>
          <img src="${character.image}" alt="${character.name}" style="width: 200px; height: auto;" />
        </div>
      `,
            showCloseButton: true,
        });
    };

    return (
        <div className="mb-4">
            <div className="card card-favorite" onClick={showDetails}>
                <div className="card-header text-center">
                    <h5 className="card-title mb-0">{character.name}</h5>
                </div>
                <img src={character.image} className="card-img-top" alt={character.name} />
                <div className="card-body">
                    <p className="card-text"><b>Status:</b> {character.status}</p>
                    <p className="card-text"><b>Species:</b> {character.species}</p>
                    <p className="card-text"><b>Gender:</b> {character.gender}</p>
                    <p className="card-text"><b>Origin:</b> {character.origin.name}</p>
                    <p className="card-text"><b>Location:</b> {character.location.name}</p>
                </div>
                <div className="card-footer">
                    <button className="btn btn-danger" onClick={(e) => { e.stopPropagation(); removeFavorite(character); }}>Remove</button>
                </div>
            </div>
        </div>
    );
};

CardCharacter.propTypes = {
    character: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        species: PropTypes.string.isRequired,
        gender: PropTypes.string.isRequired,
        origin: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        image: PropTypes.string.isRequired,
        episode: PropTypes.array.isRequired,
    }).isRequired,
    removeFavorite: PropTypes.func.isRequired,
};

export default CardCharacter;
