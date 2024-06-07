import React, { useState, useEffect } from 'react';

// Función para barajar un array aleatoriamente
const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
};

const MemoryGame = ({ characters, onExit }) => {
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [showAllCards, setShowAllCards] = useState(true);

    // useEffect para inicializar las cartas cuando se montan los personajes
    useEffect(() => {
        const doubledCards = [...characters, ...characters]; // Duplica el array de personajes para crear pares de cartas
        const shuffledCards = shuffleArray(doubledCards); // Baraja las cartas
        setCards(shuffledCards); // Establece las cartas barajadas en el estado
        setTimeout(() => {
            setShowAllCards(false); // Oculta las cartas después de 5 segundos
        }, 5000);
    }, [characters]);

    // Maneja el clic en una carta
    const handleCardClick = (index) => {
        // Evita acciones si las cartas se están mostrando, si hay más de dos cartas volteadas, si la carta ya está volteada o si ya está emparejada
        if (!showAllCards && flippedCards.length < 2 && !flippedCards.includes(index) && !matchedCards.includes(index)) {
            setFlippedCards([...flippedCards, index]); // Añade la carta volteada al estado de cartas volteadas
        }
    };

    // useEffect para comprobar si dos cartas volteadas coinciden
    useEffect(() => {
        if (flippedCards.length === 2) {
            const [firstIndex, secondIndex] = flippedCards;
            if (cards[firstIndex].id === cards[secondIndex].id) {
                setMatchedCards([...matchedCards, firstIndex, secondIndex]); // Añade las cartas emparejadas al estado de cartas emparejadas
            }
            setTimeout(() => setFlippedCards([]), 1000); // Reinicia el estado de cartas volteadas después de 1 segundo
        }
    }, [flippedCards, cards]);

    // useEffect para comprobar si todas las cartas han sido emparejadas
    useEffect(() => {
        if (matchedCards.length === cards.length && cards.length > 0) {
            setTimeout(() => {
                onExit(); // Llama a la función onExit después de 2 segundos si todas las cartas están emparejadas
            }, 2000);
        }
    }, [matchedCards, cards, onExit]);

    return (
        <div className="memory-game-container">
            <div className="memory-game-grid">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className={`memory-game-card ${!showAllCards && !flippedCards.includes(index) && !matchedCards.includes(index) ? 'flipped' : ''}`}
                        onClick={() => handleCardClick(index)}
                    >
                        <div className="memory-game-card-inner">
                            <div className="memory-game-card-front">
                                <img src={card.image} alt={card.name} />
                            </div>
                            <div className="memory-game-card-back"></div>
                        </div>
                    </div>
                ))}
            </div>
            <button className="btn btn-info" onClick={onExit}>Exit Game</button>
        </div>
    );
};

export default MemoryGame;
