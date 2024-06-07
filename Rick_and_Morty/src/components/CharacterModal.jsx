import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { getEpisodes } from '../api/RickAndMortyApi';
import closeIcon from '../assets/cerrar1.png'; // Ajusta la ruta según sea necesario
import '../styles/CustomModal.css';

const CharacterModal = ({ show, onHide, character }) => {
    const [episodes, setEpisodes] = useState([]);

    useEffect(() => {
        if (character) {
            getEpisodes(character.episode).then(setEpisodes);
        }
    }, [character]);

    if (!character) return null;

    return (
        <Modal show={show} onHide={onHide} centered scrollable>
            <Modal.Header className="bg-primary text-white">
                <Modal.Title>{character.name}</Modal.Title>
                <button type="button" className="btn-close-custom" aria-label="Close" onClick={onHide}>
                    <img src={closeIcon} alt="Cerrar" />
                </button>
            </Modal.Header>
            <Modal.Body className="bg-light text-dark">
                <div className="text-center mb-3">
                    <img src={character.image} alt={character.name} className="img-fluid rounded" style={{ maxHeight: '320px' }} />
                </div>
                <div className="text-center">
                    <p><strong className="text-primary">Estado:</strong> {character.status}</p>
                    <p><strong className="text-primary">Especie:</strong> {character.species}</p>
                    <p><strong className="text-primary">Género:</strong> {character.gender}</p>
                    <p><strong className="text-primary">Origen:</strong> {character.origin.name}</p>
                    <p><strong className="text-primary">Ubicación:</strong> {character.location.name}</p>
                </div>
                <h5 className="text-center mt-4 text-primary">Episodios:</h5>
                <ul className="list-group list-group-flush">
                    {episodes.map((episode, idx) => (
                        <li key={idx} className="list-group-item small">
                            {episode.name} (Temporada {episode.episode.split('S')[1].split('E')[0]}, Episodio {episode.episode.split('E')[1]})
                        </li>
                    ))}
                </ul>
            </Modal.Body>
            <Modal.Footer className="bg-primary justify-content-center">
                <Button variant="secondary" className="btn btn-light text-primary fw-bold px-4 py-2" onClick={onHide}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CharacterModal;
